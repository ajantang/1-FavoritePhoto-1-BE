import { assert } from "superstruct";
import ownService from "../services/ownService.js";
import { createShopStruct } from "../structs/shopStruct.js";
import { SignUpUser, SignInUser } from "../structs/user-struct.js";

export async function validateCreateShopData(req, res, next) {
  try {
    assert(req.body, createShopStruct);
  } catch (err) {
    return next(err);
  }

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
