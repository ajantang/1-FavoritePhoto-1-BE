import prisma from "./prisma.js";

async function createData({ data, select }) {
  return await prisma.shop.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.shop.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.shop.findUniqueOrThrow({ where, select });
}

async function conutData(where) {
  return await prisma.shop.count({ where });
}

async function findManyData({ where, select }) {
  return await prisma.shop.findMany({ where, select });
}

async function findManyByPaginationData({
  orderBy,
  skip,
  take,
  where,
  select,
}) {
  return await prisma.shop.findMany({ orderBy, skip, take, where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.shop.update({ where, data, select });
}

async function deleteData(where) {
  await prisma.shop.delete({ where });
}

export default {
  createData,
  findFirstData,
  findUniqueOrThrowtData,
  conutData,
  findManyData,
  findManyByPaginationData,
  updateData,
  deleteData,
};
