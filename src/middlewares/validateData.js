import { assert } from "superstruct";
import ownService from "../services/ownService.js";
import { createShopStruct } from "../structs/shopStruct.js";

export function validateCreateShopData() {
  return async (req, res, next) => {
    const userId = "3b11769f-2c33-4c76-b263-3b5bda200c43";
    const { cardId, salesQuantity, ...rest } = req.body;
    // const { userId, cardId, salesQuantity, ...rest } = req.body;
    const filter = {
      userId,
      cardId,
    };
    const own = await ownService.getByFilter(filter);
    if (own.quantity < salesQuantity) {
      const error = new Error(
        "The quantity requested for sale exceeds the available stock."
      );
      error.code = 400;
      next(error);
    }

    const newReqBody = {
      userId,
      cardId,
      ...rest,
      remainingQuantity: salesQuantity,
      totalQuantity: salesQuantity,
      own,
    };
    req.boy = newReqBody;
    assert(req.body, createShopStruct);
    next();
  };
}
