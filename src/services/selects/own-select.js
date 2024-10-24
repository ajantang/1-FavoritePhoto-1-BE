import {
  cardSelect,
  cardDetailSelect,
} from "../../services/selects/card-select.js";

export const ownSelect = {
  id: true,
  quantity: true,
};

export const ownCardSelect = {
  ...ownSelect,
  Card: { select: cardDetailSelect },
};

export const ownCardListSelect = {
  ...ownSelect,
  Card: { select: cardSelect },
};

export const ownGradeSelect = {
  quantity: true,
  Card: {
    select: {
      grade: true,
    },
  },
};
