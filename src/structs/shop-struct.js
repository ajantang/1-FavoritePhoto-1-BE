import * as s from "superstruct";
import isUuid from "is-uuid";

import card from "../constants/card.js";
import shop from "../constants/shop.js";

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));

const shopStructBody = {
  price: s.refine(
    s.number(),
    "price",
    (value) => card.PRICE_MIN_VALUE <= value && value <= card.PRICE_MAX_VALUE
  ),
  exchangeGrade: s.refine(
    s.number(),
    "exchangeGrade",
    (value) => card.GRADE_MIN_VALUE <= value && value <= card.GRADE_MAX_VALUE
  ), // 추후 수정 가능
  exchangeGenre: s.refine(
    s.number(),
    "exchangeGenre",
    (value) => card.GENRE_MIN_VALUE <= value && value <= card.GENRE_MAX_VALUE
  ), // 추후 수정 가능
  exchangeDescription: s.refine(
    s.string(),
    "shop description",
    (value) =>
      shop.DESCRIPTION_MIN_LENGTH <= value.length &&
      value.length <= shop.DESCRIPTION_MAX_LENGTH
  ),
};

export const createShopStruct = s.object({
  userId: Uuid,
  cardId: Uuid,
  remainingQuantity: s.refine(
    s.number(),
    "remainingQuantity",
    (value) => value >= card.QUANTITY_MIN_VALUE
  ),
  totalQuantity: s.refine(
    s.number(),
    "remainingQuantity",
    (value) => value >= card.QUANTITY_MIN_VALUE
  ),
  ...shopStructBody,
});

export const updateShopStruct = s.partial(
  s.object({
    remainingQuantity: s.refine(
      s.number(),
      "remainingQuantity",
      (value) => value >= card.QUANTITY_MIN_VALUE
    ),
    totalQuantity: s.refine(
      s.number(),
      "remainingQuantity",
      (value) => value >= card.QUANTITY_MIN_VALUE
    ),
    ...shopStructBody,
  })
);
