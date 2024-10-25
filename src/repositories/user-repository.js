import prisma from "./prisma.js";

async function createData({ data, select }) {
  return await prisma.user.create({ data, select });
}

async function upsertData({ where, update, create, select }) {
  return await prisma.user.upsert({ where, update, create, select });
}

async function findFirstData({ where, select }) {
  return await prisma.user.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.user.findFirstOrThrow({ where, select });
}

async function countData(where) {
  return await prisma.user.count({ where });
}

async function findManyData({ where, select }) {
  return await prisma.user.findMany({ where, select });
}

async function findManyByPaginationData({
  orderBy,
  skip,
  take,
  where,
  select,
}) {
  return await prisma.user.findMany({ orderBy, skip, take, where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.user.update({ where, data, select });
}

async function deleteData(where) {
  await prisma.user.delete({ where });
}

async function deleteManyData(where) {
  await prisma.user.deleteMany({ where });
}

export default {
  createData,
  upsertData,
  findFirstData,
  findUniqueOrThrowtData,
  countData,
  findManyData,
  findManyByPaginationData,
  updateData,
  deleteData,
  deleteManyData,
};
