import { cardDetailSelect, cardSelect } from "./card-select.js";
import {
  exchangeCardInfo,
  exchangeCardShopAndUserSelect,
} from "./exchange-select.js";

export const shopSelect = {
  id: true,
  userId: true,
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
  ...shopCreateSelect,
  Exchanges: {
    select: exchangeCardShopAndUserSelect,
  },
};

export const shopOwnerSelect = {
  User: {
    select: {
      id: true,
    },
  },
};

export const shopGradeSelect = {
  remainingQuantity: true,
  Card: {
    select: {
      grade: true,
    },
  },
};
