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

export const exchangeShopIdSelect = {
  ...exchangeSelect,
  shopId: true,
};

export const exchangeCardShopSelect = {
  ...exchangeSelect,
  Card: {
    select: cardSelect,
  },
  shopId: true,
  userId: true,
};

export const exchangeCardShopAndUserSelect = {
  ...exchangeCardShopSelect,
  userId: true,
};
