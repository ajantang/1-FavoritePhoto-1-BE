import * as ss from "superstruct";
import isUuid from "is-uuid";

import exchange from "../constants/exchange.js";

const uuid = ss.define("Uuid", (value) => isUuid.v4(value));

export const Exchange = ss.object({
  cardId: uuid,
  exchangeDescription: s.size(
    s.string,
    exchange.DESCRIPTION_MIN_LENGTH,
    exchange.DESCRIPTION_MAX_LENGTH
  ),
});
