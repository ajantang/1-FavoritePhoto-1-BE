import { cardSelect } from "./card-select.js";

export const exchangeSelect = {
  id: true,
  description: true,
  createdAt: true,
};

export const exchangeCardInfo = {
  ...exchangeSelect,
  Card: {
    select: cardSelect,
  },
};
