import prisma from "./prisma.js";

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
  createData,
  findFirstData,
  updateData,
};
