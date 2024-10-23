import prisma from "./prisma.js";

async function createData({ data, select }) {
  return await prisma.session.create({ data, select });
}

async function upsertData({ where, update, create, select }) {
  return await prisma.session.upsert({ where, update, create, select });
}

async function findFirstData({ where, select }) {
  return await prisma.session.findFirst({ where, select });
}

async function deleteData(where) {
  await prisma.session.delete({ where });
}

async function deleteManyData(where) {
  await prisma.session.deleteMany({ where });
}

export default {
  createData,
  upsertData,
  findFirstData,
  deleteData,
  deleteManyData,
};
