import { assert } from "superstruct";
import ownService from "../services/ownService";
import { createShopStruct } from "../structs/shopStruct";

function createShop() {
  return async (req, res, next) => {
    const userId = "";
    const { cardId, salesQuantity, ...rest } = req.body;
    // const { userId, cardId, salesQuantity, ...rest } = req.body;
    const filter = {
      userId,
      cardId,
    };
    const inventory = await ownService.getByFilter(filter);
    if (inventory.quantity < salesQuantity) {
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
    };
    req.boy = newReqBody;
    assert(req.body, createShopStruct);
    next();
  };
}

export default { createShop };
