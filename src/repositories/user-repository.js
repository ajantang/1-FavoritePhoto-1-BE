import prisma from "./prisma.js";
import {
  userSelect,
  userPasswordSelect,
} from "../services/selects/user-select.js";

async function createUser({ email, encryptedPassword, nickname }) {
  return await prisma.user.create({
    data: { email, encryptedPassword, nickname },
    select: userSelect,
  });
}

async function getUserInfoByUserId(id) {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
    select: userSelect,
  });
}

async function getUserInfoPasswordByEmail(email) {
  return await prisma.user.findUniqueOrThrow({
    where: { email },
    select: userPasswordSelect,
  });
}

async function increaseUserPoint({ id, earnedPoint }) {
  return prisma.user.update({
    where: { id },
    data: {
      point: {
        increment: earnedPoint,
      },
    },
    select: userSelect,
  });
}

async function decreaseUserPoint({ id, lostPoint }) {
  return prisma.user.update({
    where: { id },
    data: {
      point: {
        decrement: lostPoint,
      },
    },
    select: userSelect,
  });
}

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
  createUser,
  getUserInfoByUserId,
  getUserInfoPasswordByEmail,
  increaseUserPoint,
  decreaseUserPoint,
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
