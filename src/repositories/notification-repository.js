import prisma from "./prisma.js";

async function createData({ data, select }) {
  return await prisma.notification.create({ data, select });
}

async function createManyData({ data, skipDuplicates, select }) {
  return await prisma.notification.createMany({ data, skipDuplicates, select });
}

async function findFirstData({ where, select }) {
  return await prisma.notification.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.notification.findFirstOrThrow({ where, select });
}

async function countData(where) {
  return await prisma.notification.count({ where });
}

async function findManyData({ where, select }) {
  return await prisma.notification.findMany({ where, select });
}

async function findManyByPaginationData({
  orderBy,
  skip,
  take,
  where,
  select,
}) {
  return await prisma.notification.findMany({
    orderBy,
    skip,
    take,
    where,
    select,
  });
}

async function updateData({ where, data, select }) {
  return await prisma.notification.update({ where, data, select });
}

async function deleteData(where) {
  await prisma.notification.delete({ where });
}

export default {
  createData,
  createManyData,
  findFirstData,
  findUniqueOrThrowtData,
  countData,
  findManyData,
  findManyByPaginationData,
  updateData,
  deleteData,
};
