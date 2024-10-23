import prisma from "./prisma.js";

import {
  shopCreateSelect,
  shopDetailSelect,
  shopListSelect,
  shopOwnerSelect,
} from "../services/selects/shop-select.js";

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

async function updateShop(id, updateData) {
  return prisma.shop.update({
    where: { id },
    data: updateData,
    select: shopCreateSelect,
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

async function getGroupCountByGrade({ userId, where }) {
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

async function deleteShop(id) {
  await prisma.shop.delete({ where: { id } });
}

async function findShopOwnerId(id) {
  return await prisma.shop.findFirst({
    where: { id },
    select: shopOwnerSelect,
  });
}

async function createData({ data, select }) {
  return await prisma.shop.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.shop.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.shop.findUniqueOrThrow({ where, select });
}

async function conutData(where) {
  return await prisma.shop.count({ where });
}

async function findManyData({ where, select }) {
  return await prisma.shop.findMany({ where, select });
}

async function findManyByPaginationData({
  orderBy,
  skip,
  take,
  where,
  select,
}) {
  return await prisma.shop.findMany({ orderBy, skip, take, where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.shop.update({ where, data, select });
}

async function deleteData(where) {
  await prisma.shop.delete({ where });
}

export default {
  createShop,
  getShopListByQuery,
  countShopListByQuery,
  getShopDetailById,
  checkUserShopOwner,
  updateShop,
  findMyShopList,
  getGroupCountByGrade,
  deleteShop,
  findShopOwnerId,
  createData,
  findFirstData,
  findUniqueOrThrowtData,
  conutData,
  findManyData,
  findManyByPaginationData,
  updateData,
  deleteData,
};
