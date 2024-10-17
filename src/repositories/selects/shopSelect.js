import { cardDetailSelect, cardSelect } from "./card-select.js";

export const shopSelect = {
  id: true,
  price: true,
  remainingQuantity: true,
  totalQuantity: true,
  exchangeGrade: true,
  exchangeGenre: true,
  exchangeDescription: true,
};

export const shopCreateSelect = {
  ...shopSelect,
  User: {
    select: {
      nickname: true,
    },
  },
  Card: {
    select: cardDetailSelect,
  },
};

export const shopListSelect = {
  ...shopSelect,
  createdAt: true,
  Card: {
    select: cardSelect,
  },
};

export const shopDetailSelect = {
  ...shopSelect,
  Card: {
    select: cardDetailSelect,
  },
  User: {
    select: {
      nickname: true,
    },
  },
  Exchanges: {
    select: {
      id: true,
      description: true,
      Card: {
        select: cardSelect,
      },
    },
  },
};
