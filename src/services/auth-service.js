import prisma from "../repositories/prisma.js";
import userRepository from "../repositories/user-repository.js";
import lastBoxTimeRepository from "../repositories/last-box-time-repository.js";
import sessionRepository from "../repositories/session-repository.js";
import {
  createHashedPassword,
  comparePassword,
} from "../utils/password-util.js";

import { EXPIRE_TIME } from "../constants/session.js";

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

async function signIn({ email, password, session }) {
  return prisma.$transaction(async () => {
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

    const userId = rest.id;
    session.userId = userId;
    const now = new Date();
    const expires = new Date(now.getTime() + EXPIRE_TIME);
    const data = JSON.stringify(session);

    const upsertWhere = { id: session.id };
    const upsertCreate = { id: session.id, userId, expires, data };
    const upsertUpdate = { userId, expires, data };

    await sessionRepository.upsertData({
      where: upsertWhere,
      create: upsertCreate,
      update: upsertUpdate,
    });

    return { userInfo: rest, session };
  });
}

async function signOut(sessionId) {
  const where = { id: sessionId };

  await sessionRepository.deleteData(where);
}

export default { signUp, signIn, signOut };
