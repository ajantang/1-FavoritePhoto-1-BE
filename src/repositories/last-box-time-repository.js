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

async function createData({ data, select }) {
  return await prisma.user.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.user.findFirst({ where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.user.update({ where, data, select });
}

export default {
  findLastBoxTime,
  updateLastBoxTime,
  createData,
  findFirstData,
  updateData,
};
