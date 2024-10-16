import authRepository from "../repositories/auth-repository.js";
import sessionRepository from "../repositories/session-repository.js";
import {
  createHashedPassword,
  comparePassword,
} from "../utils/password-util.js";

import { EXPIRE_TIME } from "../constants/session.js";

async function createSession({ sessionId, userId, sessionData }) {
  const now = new Date();
  const expires = new Date(now.getTime() + EXPIRE_TIME);

  await sessionRepository.createSession({
    sessionId,
    userId,
    expires,
    data: sessionData,
  });
}

async function deleteSession(sessionId) {
  await sessionRepository.deleteSession(sessionId);
}

async function signUp({ email, password, nickname }) {
  const encryptedPassword = await createHashedPassword(password);
  const createdUser = await authRepository.createUser({
    email,
    encryptedPassword,
    nickname,
  });

  return createdUser;
}

async function signIn({ email, password }) {
  const { encryptedPassword, ...rest } =
    await authRepository.getUserInfoPasswordByEmail(email);

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
