import { cardSelect } from "./cardSelect";

export const userSelect = {
  id: true,
  email: true,
  nickname: true,
  point: true,
  createAt: true,
};

export const userOwnSelect = {
  id: true,
  Owns: {
    select: cardSelect,
  },
};
