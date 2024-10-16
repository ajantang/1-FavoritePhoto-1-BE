import * as s from 'superstruct'
import isUuid from "is-uuid";

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));

const shopStructBody = {
  price: s.min(s.number(), 0),
  exchangeGrade: s.min(s.max(s.number(), 3), 0), // 추후 수정 가능
  exchangeGenre: s.min(s.max(s.number(), 3), 0), // 추후 수정 가능
  exchangeDescription: s.size(s.string(), 0, 1024),
};

export const createShopStruct = s.object({
  userId: Uuid,
  cardId: Uuid,
  remainingQuantity: s.min(s.number(), 0),
  totalQuantity: s.min(s.number(), 0),
  ...shopStructBody,
});
