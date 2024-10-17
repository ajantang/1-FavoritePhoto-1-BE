import prisma from "./prisma.js";

import {
  shopCreateSelect,
  shopDetailSelect,
  shopListSelect,
} from "./selects/shopSelect.js";

async function createShop(createData) {
  return await prisma.shop.create({
    data: createData,
    select: shopCreateSelect,
  });
}

async function getShopListByQuery(filter) {
  const { orderBy, skip, take, where } = filter;
  return prisma.shop.findMany({
    orderBy,
    skip,
    take,
    where,
    select: shopListSelect,
  });
}

async function countShopListByQuery(filter) {
  return prisma.shop.count({
    where: filter,
  });
}

async function getShopDetailById(id) {
  return prisma.shop.findUniqueOrThrow({
    where: { id },
    select: shopDetailSelect,
  });
}

async function checkUserShopOwner(filter) {
  return prisma.shop.findFirst({
    where: filter,
  });
}

async function findMyShopList({ userId, filter }) {
  const { orderBy, skip, take, where } = filter;

  return await prisma.shop.findMany({
    orderBy,
    skip,
    take,
    where: { userId, ...where },
    select: shopListSelect,
  });
}

async function getGroupCountByGrade({ userId, filter }) {
  const { where } = filter;

  const shops = await prisma.shop.findMany({
    where: {
      userId,
      ...where,
    },
    select: {
      remainingQuantity: true,
      Card: {
        select: {
          grade: true,
        },
      },
    },
  });

  const counts = shops.reduce((acc, shop) => {
    const grade = shop.Card.grade;

    if (!acc[grade]) {
      acc[grade] = 0;
    }

    acc[grade] += shop.remainingQuantity;

    return acc;
  }, {});

  return counts;
}

export default {
  createShop,
  getShopListByQuery,
  countShopListByQuery,
  getShopDetailById,
  checkUserShopOwner,
  findMyShopList,
  getGroupCountByGrade,
};
