import prisma from "./prisma.js";
import { createCardListFilterByQuery } from "../utils/query-util.js";
import { ownSelect, ownCardSelect } from "./selects/own-select.js";

async function getByFilter(filter) {
  return await prisma.own.findFirst({
    where: filter,
    select: ownSelect,
  });
}

async function update(where, data) {
  return await prisma.own.update({
    where,
    data,
  });
}

async function createOwn({ cardId, userId, quantity }) {
  const newOwnData = { userId, cardId, quantity };

  return await prisma.own.create({
    data: newOwnData,
    select: ownCardSelect,
  });
}

async function findOwnCardList({ userId, filter }) {
  const { orderBy, skip, take, where } = filter;

  return await prisma.own.findMany({
    orderBy,
    skip,
    take,
    where: { userId, ...where },
    select: ownCardSelect,
  });
}

async function getGroupCountByGrade({ userId, filter }) {
  const { where } = filter;

  const owns = await prisma.own.findMany({
    where: {
      userId,
      ...where,
    },
    select: {
      quantity: true,
      Card: {
        select: {
          grade: true,
        },
      },
    },
  });

  const counts = owns.reduce((acc, own) => {
    const grade = own.Card.grade;

    if (!acc[grade]) {
      acc[grade] = 0;
    }

    acc[grade] += own.quantity;

    return acc;
  }, {});

  return counts;
}

async function deleteById(id) {
  return await prisma.own.delete({
    where: { id },
  });
}

//

async function createData({ data, select }) {
  return await prisma.own.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.own.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.own.findFirst({ where, select });
}

async function conutData(where) {
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

export default {
  getByFilter,
  update,
  createOwn,
  findOwnCardList,
  getGroupCountByGrade,
  deleteById,
  createData,
  findFirstData,
  findUniqueOrThrowtData,
  conutData,
  findManyData,
  findManyByPaginationData,
  updateData,
  deleteData,
};
