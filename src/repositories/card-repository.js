import prisma from "./prisma.js";
import { cardSelect } from "./selects/card-select.js";

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

  return await prisma.card.create({ data: newCardData, select: cardSelect });
}

async function findMyShopCardList({}) {}

async function findMyRequestCardList({}) {}

async function findCard({}) {}

async function updateCard({}) {}

async function deleteCard({}) {}

export default { createCard };
