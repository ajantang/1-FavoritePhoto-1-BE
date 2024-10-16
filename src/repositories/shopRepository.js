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

async function countByFilter(filter) {
  return prisma.shop.count({
    where: filter,
  });
}

export default { createShop, getShopListByFilter, countByFilter };
