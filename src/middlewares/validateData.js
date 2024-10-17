import { assert } from "superstruct";
import ownService from "../services/ownService.js";
import { createShopStruct, updateShopStruct } from "../structs/shopStruct.js";
import { SignUpUser, SignInUser } from "../structs/user-struct.js";
import shopService from "../services/shopService.js";

export async function validateCreateShopData(req, res, next) {
  const userId = req.session.userId;
  const { cardId, salesQuantity, ...rest } = req.body;
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

    return next(error);
  }

  const newReqBody = {
    userId,
    cardId,
    ...rest,
    remainingQuantity: salesQuantity,
    totalQuantity: salesQuantity,
  };
  req.body = newReqBody;
  assert(req.body, createShopStruct);

  req.body.own = own;

  return next();
}

export function validateSignUpUserData(req, res, next) {
  try {
    assert(req.body, SignUpUser);

    return next();
  } catch (err) {
    return next(err);
  }
}

export function validateSignInUserData(req, res, next) {
  try {
    assert(req.body, SignInUser);

    return next();
  } catch (err) {
    return next(err);
  }
}

export async function validateCreateShopData(req, res, next) {
  const userId = req.session.userId;
  const { id } = req.params;
  const { salesQuantity, ...rest } = req.body;
  const isOwner = await shopService.checkUserShopOwner(userId, id);
  if (!isOwner) {
    const error = new Error(
      "You do not have permission to access this product."
    );
    error.code = 403;
    next(error);
  }
  const newReqBody = { ...rest };
  let ownId;
  let ownUpdateQuantity;
  let isOutOfStock = false;

  // 보유량 총합 확인
  if (salesQuantity) {
    const ownFilter = {
      cardId: isOwner.cardId,
      userId,
    };
    const own = await ownService.getByFilter(ownFilter);
    const userTotalStock = isOwner.remainingQuantity + own.quantity;
    ownId = own.id;

    if (salesQuantity > userTotalStock) {
      const error = new Error("Sale quantity exceeds available stock.");
      error.code = 400;
      next(error);
    } else if (req.salesQuantity === userTotalStock) {
      isOutOfStock = true;
    }

    const addQuantity = salesQuantity - isOwner.remainingQuantity;
    ownUpdateQuantity = own.quantity - addQuantity

    newReqBody.remainingQuantity = salesQuantity;
    newReqBody.totalQuantity = isOwner.totalQuantity + addQuantity;
  }

  req.body = newReqBody;
  assert(req.body, updateShopStruct);

  req.body.ownId = ownId;
  req.body.ownUpdateQuantity = ownUpdateQuantity;
  req.body.isOutOfStock = isOutOfStock;
  next();
}
