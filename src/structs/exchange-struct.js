import { object, string, size } from "superstruct";
import Uuid from "./uuid.js";

import exchange from "../constants/exchange.js";

export const Exchange = object({
  cardId: Uuid,
  exchangeDescription: size(
    string(),
    exchange.DESCRIPTION_MIN_LENGTH,
    exchange.DESCRIPTION_MAX_LENGTH
  ),
});
