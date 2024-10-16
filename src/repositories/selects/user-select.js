import { cardSelect } from "./card-select.js";

export const userSelect = {
  id: true,
  email: true,
  nickname: true,
  point: true,
  createdAt: true,
};

export const userPasswordSelect = {
  ...userSelect,
  encryptedPassword: true,
};

export const userOwnSelect = {
  id: true,
  Owns: {
    select: cardSelect,
  },
};
