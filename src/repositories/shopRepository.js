import prisma from "./prisma.js";

import { shopCreateSelect, shopListSelect } from "./selects/shopSelect.js";

async function createShop(createData) {
  return await prisma.shop.create({
    data: createData,
    select: shopCreateSelect,
  });
}

async function getShopListByFilter(filter) {
  const { orderBy, skip, take, where } = filter;
  return prisma.shop.findMany({
    orderBy,
    skip,
    take,
    where,
    select: shopListSelect,
  });
}

async function countShopListByFilter(filter) {
  return prisma.shop.count({
    where: filter,
  });
}

async function getShopDetailById(id) {
  return prisma.shop.findUniqueOrThrow({
    where: { id },
  });
}

export default {
  createShop,
  getShopListByFilter,
  countShopListByFilter,
  getShopDetailById,
};
