import * as s from 'superstruct'
import isUuid from "is-uuid";

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));

const shopStructBody = {
  price: s.min(s.number(), 0),
  exchangeGrade: s.refine(s.number(), "exchangeGrade", (value) => value >= 0 && value <= 3), // 추후 수정 가능
  exchangeGenre: s.refine(s.number(), "exchangeGenre", (value) => value >= 0 && value <= 3), // 추후 수정 가능
  exchangeDescription: s.size(s.string(), 0, 1024),
};

export const createShopStruct = s.object({
  userId: Uuid,
  cardId: Uuid,
  remainingQuantity: s.refine(s.number(), "remainingQuantity", (value) => value >= 1),
  totalQuantity: s.refine(s.number(), "remainingQuantity", (value) => value >= 1),
  ...shopStructBody,
});
