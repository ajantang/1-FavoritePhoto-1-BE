import { cardDetailSelect } from "./cardSelect";

export const shopSelect = {
  id: true,
  price: true,
  reremainingQuantity: true,
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
  Card: cardDetailSelect
};
