import prisma from "./prisma.js";

async function createData({ data, select }) {
  return await prisma.exchange.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.exchange.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.exchange.findUniqueOrThrow({ where, select });
}

async function countData(where) {
  return await prisma.exchange.count({ where });
}

async function findManyData({ where, select }) {
  return await prisma.exchange.findMany({ where, select });
}

async function findManyByPaginationData({
  orderBy,
  skip,
  take,
  where,
  select,
}) {
  return await prisma.exchange.findMany({ orderBy, skip, take, where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.exchange.update({ where, data, select });
}

async function deleteData(where) {
  await prisma.exchange.delete({ where });
}

async function deleteManyData(where) {
  await prisma.exchange.deleteMany({ where });
}

export default {
  createData,
  findFirstData,
  findUniqueOrThrowtData,
  countData,
  findManyData,
  findManyByPaginationData,
  updateData,
  deleteData,
  deleteManyData,
};
