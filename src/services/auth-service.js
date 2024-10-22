import prisma from "../repositories/prisma.js";
import userRepository from "../repositories/user-repository.js";
import lastBoxTimeRepository from "../repositories/last-box-time-repository.js";
import sessionRepository from "../repositories/session-repository.js";
import {
  createHashedPassword,
  comparePassword,
} from "../utils/password-util.js";

import { EXPIRE_TIME } from "../constants/session.js";

async function createSession({ sessionId, userId, sessionData }) {
  const now = new Date();
  const expires = new Date(now.getTime() + EXPIRE_TIME);

  const session = await sessionRepository.createSession({
    sessionId,
    userId,
    expires,
    data: sessionData,
  });

  if (session) {
    console.log("☆session");
    console.log(session);
  }

  if (session?.userId) {
    console.log("☆session.userId");
    console.log(session.userId);
  }
}

async function deleteSession(sessionId) {
  await sessionRepository.deleteSession(sessionId);
}

async function signUp({ email, password, nickname }) {
  const encryptedPassword = await createHashedPassword(password);

  return prisma.$transaction(async () => {
    const createdUser = await userRepository.createUser({
      email,
      encryptedPassword,
      nickname,
    });

    await lastBoxTimeRepository.createLastBoxTime(createdUser.id);

    return createdUser;
  });
}

async function signIn({ email, password }) {
  const { encryptedPassword, ...rest } =
    await userRepository.getUserInfoPasswordByEmail(email);

  if (!encryptedPassword) {
    return null;
  }

  const isCorrect = await comparePassword({
    passwordInput: password,
    encryptedPassword,
  });

  if (!isCorrect) {
    return null;
  }

  return rest;
}

async function signOut() {}

export default { createSession, deleteSession, signUp, signIn, signOut };
