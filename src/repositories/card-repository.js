import prisma from "./prisma.js";
import {
  cardSelect,
  cardDetailSelect,
} from "../services/selects/card-select.js";

async function createCard({
  name,
  description,
  image,
  grade,
  genre,
  price,
  userId,
  quantity,
}) {
  const newCardData = {
    name,
    description,
    image,
    grade,
    genre,
    price,
    userId,
    totalQuantity: quantity,
  };

  return await prisma.card.create({
    data: newCardData,
    select: cardDetailSelect,
  });
}

async function createData({ data, select }) {
  return await prisma.card.create({ data, select });
}

async function findFirstData({ where, select }) {
  return await prisma.card.findFirst({ where, select });
}

async function findUniqueOrThrowtData({ where, select }) {
  return await prisma.card.findUniqueOrThrow({ where, select });
}

async function countData(where) {
  return await prisma.card.count({ where });
}

async function findManyData({ where, select }) {
  return await prisma.card.findMany({ where, select });
}

async function updateData({ where, data, select }) {
  return await prisma.card.update({ where, data, select });
}

async function deleteData(where) {
  await prisma.card.delete({ where });
}

export default {
  createCard,
  createData,
  findFirstData,
  findUniqueOrThrowtData,
  countData,
  findManyData,
  updateData,
  deleteData,
};
