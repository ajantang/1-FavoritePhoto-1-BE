import { object, size, string, refine, number } from "superstruct";

import card from "../constants/card.js";

export const Card = object({
  name: size(string(), card.NAME_MIN_LENGTH, card.NAME_MAX_LENGTH),
  description: size(
    string(),
    card.DESCRIPTION_MIN_LENGTH,
    card.DESCRIPTION_MAX_LENGTH
  ),
  image: size(string(), card.IMAGE_MIN_LENGTH, card.IMAGE_MAX_LENGTH),
  grade: refine(
    number(),
    "grade",
    (value) => card.GRADE_MIN_VALUE <= value && value <= card.GRADE_MAX_VALUE
  ),
  genre: refine(
    number(),
    "genre",
    (value) => card.GENRE_MIN_VALUE <= value && value <= card.GENRE_MAX_VALUE
  ),
  quantity: refine(
    number(),
    "quantity",
    (value) =>
      card.QUANTITY_MIN_VALUE <= value && value <= card.QUANTITY_MAX_VALUE
  ),
  price: refine(
    number(),
    "price",
    (value) => card.PRICE_MIN_VALUE <= value && value <= card.PRICE_MAX_VALUE
  ),
});
