import prisma from "./prisma.js";
import { userSelect, userPasswordSelect } from "./selects/user-select.js";

async function createUser({ email, encryptedPassword, nickname }) {
  return await prisma.user.create({
    data: { email, encryptedPassword, nickname },
    select: userSelect,
  });
}

async function getUserInfoByUserId(id) {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
    select: userSelect,
  });
}

async function getUserInfoPasswordByEmail(email) {
  return await prisma.user.findUniqueOrThrow({
    where: { email },
    select: userPasswordSelect,
  });
}

export default { createUser, getUserInfoByUserId, getUserInfoPasswordByEmail };
