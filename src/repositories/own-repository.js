import prisma from "./prisma.js";
import { ownCardSelect } from "../services/selects/own-select.js";

async function createData({ data, select }) {
  return await prisma.own.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.own.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.own.findUniqueOrThrow({ where, select });
}

async function countData(where) {
  return await prisma.own.count({ where });
}

async function findManyData({ where, select }) {
  return await prisma.own.findMany({ where, select });
}

async function findManyByPaginationData({
  orderBy,
  skip,
  take,
  where,
  select,
}) {
  return await prisma.own.findMany({ orderBy, skip, take, where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.own.update({ where, data, select });
}

async function deleteData(where) {
  await prisma.own.delete({ where });
}

async function upsertData({ where, update, create, select }) {
  return await prisma.own.upsert({ where, update, create, select });
}

async function findShopOwnerId({ userId, cardId }) {
  return prisma.own.findFirst({
    where: { userId, cardId },
    select: ownCardSelect,
  });
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
  upsertData,
  findShopOwnerId,
};
