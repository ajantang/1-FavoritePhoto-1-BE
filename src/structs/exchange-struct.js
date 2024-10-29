import { object, string, size } from "superstruct";
import Uuid from "./uuid.js";

import exchange from "../constants/exchange.js";

export const Exchange = object({
  cardId: Uuid,
  exchangeDescription: refine(
    string(),
    "exchange description",
    (value) =>
      exchange.DESCRIPTION_MIN_LENGTH <= value.length &&
      value.length <= exchange.DESCRIPTION_MAX_LENGTH
  ),
});
