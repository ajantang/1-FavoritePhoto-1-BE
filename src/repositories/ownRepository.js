import prisma from "./prisma.js";
import { ownSelect, ownCardSelect } from "./selects/own-select.js";

async function getByFilter(filter) {
  return await prisma.own.findFirstOrThrow({
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

async function findOwnCardList(userId) {
  return await prisma.own.findMany({
    where: { userId },
    select: ownCardSelect,
  });
}

async function getGroupCountByGrade(userId) {
  const owns = await prisma.own.findMany({
    where: {
      userId,
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

export default {
  getByFilter,
  update,
  createOwn,
  findOwnCardList,
  getGroupCountByGrade,
};
