import * as s from "superstruct";
import isUuid from "is-uuid";

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));

const shopStructBody = {
  salesQuantity: s.refine(s.number(), "price", (value) => value >= 0),
  price: s.refine(s.number(), "price", (value) => value >= 0),
  exchangeGrade: s.refine(
    s.number(),
    "exchangeGrade",
    (value) => value >= 0 && value <= 3
  ), // 추후 수정 가능
  exchangeGenre: s.refine(
    s.number(),
    "exchangeGrade",
    (value) => value >= 0 && value <= 3
  ), // 추후 수정 가능
  exchangeDescription: s.size(s.string, 0, 1024),
};

export const createShopStruct = s.object({
  userId: Uuid,
  cardId: Uuid,
  ...shopStructBody,
});
