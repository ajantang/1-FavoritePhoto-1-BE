import { object, size, string, refine, number } from "superstruct";

import card from "../constants/card.js";
import { urlPattern } from "./patterns/pattern.js";

export const Card = object({
  name: refine(
    string(),
    "image name",
    (value) => card.NAME_MIN_LENGTH <= value && value <= card.NAME_MAX_LENGTH
  ),
  description: refine(
    string(),
    "image description",
    (value) =>
      card.DESCRIPTION_MIN_LENGTH <= value.length &&
      value.length <= card.DESCRIPTION_MAX_LENGTH
  ),
  image: refine(
    urlPattern,
    "image url",
    (value) => card.IMAGE_MIN_LENGTH <= value && value <= card.IMAGE_MAX_LENGTH
  ),
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
