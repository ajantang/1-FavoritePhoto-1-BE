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

export default {
  checkExchangeByUser,
  findMyExchangeList,
  getGroupCountByGrade,
};
