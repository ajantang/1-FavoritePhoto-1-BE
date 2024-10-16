import { cardSelect } from "./card-select";

export const userSelect = {
  id: true,
  email: true,
  nickname: true,
  point: true,
  createAt: true,
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
