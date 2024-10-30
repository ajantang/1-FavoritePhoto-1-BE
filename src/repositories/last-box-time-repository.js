import prisma from "./prisma.js";

async function createData({ data, select }) {
  return await prisma.lastBoxTime.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.lastBoxTime.findFirst({ where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.lastBoxTime.update({ where, data, select });
}

export default {
  createData,
  findFirstData,
  updateData,
};
