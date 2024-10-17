import prisma from "./prisma.js";

async function findLastBoxTime(userId) {
  return await prisma.lastBoxTime.findFirst({
    where: { userId },
    select: { updatedAt: true },
  });
}

async function updateLastBoxTime(userId) {
  return await prisma.lastBoxTime.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
    },
    select: { updatedAt: true },
  });
}

// 회원 가입시
async function createLastBoxTime(userId) {
  return await prisma.lastBoxTime.create({ data: { userId } });
}

export default { findLastBoxTime, updateLastBoxTime, createLastBoxTime };
