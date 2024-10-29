import prisma from "./prisma.js";

async function createData({ data, select }) {
  return await prisma.card.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.card.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.card.findUniqueOrThrow({ where, select });
}

async function countData(where) {
  return await prisma.card.count({ where });
}

async function findManyData({ where, select }) {
  return await prisma.card.findMany({ where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.card.update({ where, data, select });
}

async function deleteData(where) {
  await prisma.card.delete({ where });
}

export default {
  createData,
  findFirstData,
  findUniqueOrThrowtData,
  countData,
  findManyData,
  updateData,
  deleteData,
};
