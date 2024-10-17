import prisma from "./prisma.js";

async function findLastBoxTime(userId) {
  return await prisma.lastBoxTime.findFirst({
    where: { id: userId },
    select: { updatedAt: true },
  });
}

async function updateLastBoxTime(userId) {
  return await prisma.lastBoxTime.update({
    where: { id: userId },
    data: { updatedAt: new Date() },
    select: { updatedAt: true },
  });
}

// 회원 가입시
async function createLastBoxTime(userId) {
  return await prisma.lastBoxTime.create({ data: { id: userId } });
}

export default { findLastBoxTime, updateLastBoxTime, createLastBoxTime };
