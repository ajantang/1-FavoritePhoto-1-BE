import prisma from "./prisma.js";
import { exchangeCardInfo } from "./selects/exchange-select.js";

async function checkExchangeByUser(filter) {
  return await prisma.exchange.findMany({
    where: filter,
    select: exchangeCardInfo,
  });
}

async function findMyExchangeList({ userId, filter }) {
  const { orderBy, skip, take, where } = filter;

  return await prisma.exchange.findMany({
    orderBy,
    skip,
    take,
    where: { userId, ...where },
    select: exchangeCardInfo,
  });
}

async function getGroupCountByGrade({ userId, filter }) {
  const { where } = filter;

  const exchanges = await prisma.exchange.findMany({
    where: {
      userId,
      ...where,
    },
    select: {
      Card: {
        select: {
          grade: true,
        },
      },
    },
  });

  const counts = exchanges.reduce((acc, exchange) => {
    const grade = exchange.Card.grade;

    if (!acc[grade]) {
      acc[grade] = 0;
    }

    acc[grade]++;

    return acc;
  }, {});

  return counts;
}

async function deleteByExchangeId(id) {
  return await prisma.exchange.delete({
    where: { id },
  });
}

async function createData({ data, select }) {
  return await prisma.exchange.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.exchange.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.exchange.findFirstOrThrow({ where, select });
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

async function countGroupCountByGrade({ userId, where }) {
  const exchanges = await prisma.exchange.findMany({
    where: {
      userId,
      ...where,
    },
    select: {
      Card: {
        select: {
          grade: true,
        },
      },
    },
  });

  const counts = exchanges.reduce((acc, exchange) => {
    const grade = exchange.Card.grade;

    if (!acc[grade]) {
      acc[grade] = 0;
    }

    acc[grade]++;

    return acc;
  }, {});

  return counts;
}

export default {
  checkExchangeByUser,
  findMyExchangeList,
  getGroupCountByGrade,
  deleteByExchangeId,
  createData,
  findFirstData,
  findUniqueOrThrowtData,
  countData,
  findManyData,
  findManyByPaginationData,
  updateData,
  deleteData,
  countGroupCountByGrade,
};
