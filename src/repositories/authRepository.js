import prisma from "./prisma";
import { userSelect } from "./selects/userSelect";

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

async function getUserPasswordByEmail(email) {
  return await prisma.user.findUniqueOrThrow({
    where: { email },
    select: userSelect,
  });
}
