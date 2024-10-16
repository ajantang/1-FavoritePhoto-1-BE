import * as ss from "superstruct";

import card from "../constants/card";

export const Card = ss.object({
  name: ss.size(ss.string(), card.NAME_MIN_LENGTH, card.NAME_MAX_LENGTH),
  description: s.size(
    s.string(),
    card.DESCRIPTION_MIN_LENGTH,
    card.DESCRIPTION_MAX_LENGTH
  ),
  image: s.size(s.string(), card.IMAGE_MIN_LENGTH, card.IMAGE_MAX_LENGTH),
  grade: s.refine(
    s.number(),
    "grade",
    (value) => card.GRADE_MIN_VALUE <= value && value <= card.GRADE_MAX_VALUE
  ),
  exchangeGenre: s.refine(
    s.number(),
    "genre",
    (value) => card.GENRE_MIN_VALUE <= value && value <= card.GENRE_MAX_VALUE
  ),
  quantity: s.refine(
    s.number(),
    "quantity",
    (value) =>
      card.QUANTITY_MIN_VALUE <= value && value <= card.QUANTITY_MAX_VALUE
  ),
  price: s.refine(
    s.number(),
    "price",
    (value) => card.PRICE_MIN_VALUE <= value && value <= card.PRICE_MAX_VALUE
  ),
});
