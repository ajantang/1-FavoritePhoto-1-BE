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

export async function validateUpdaeShopData(req, res, next) {
  const userId = req.session.userId;
  const { id } = req.params;
  const { salesQuantity, ...rest } = req.body;
  // 등록한 사람인지 확인
  const isOwner = await shopService.checkUserShopOwner(userId, id);

  // 등록한 사람이 아닐 시
  if (isOwner === null || isOwner === undefined) {
    const error = new Error(
      "You do not have permission to access this product."
    );
    error.code = 403;
    return next(error);
  }
  const newReqBody = { ...rest };
  let ownId;
  let ownUpdateQuantity;
  let isOutOfStock = false;
  let isOwn = true;
  let creatOwnQuantity;

  // req.body에 salesQuantity가 있을 시
  if (salesQuantity) {
    const ownFilter = {
      cardId: isOwner.cardId,
      userId,
    };
    // own이 있는 지 확인
    const own = await ownService.getByFilter(ownFilter);

    const ownQuantity = own ? own.quantity : 0;
    const userTotalStock = isOwner.remainingQuantity + ownQuantity;
    ownId = own ? own.id : "";

    // 수량에 변화가 있으며 own이 없을 시 own 생성
    if (
      (salesQuantity !== userTotalStock && own === null) ||
      (salesQuantity !== userTotalStock && own === undefined)
    ) {
      isOwn = false;
    }

    // 총 보유량 보다 수정할 수량이 많을 경우
    if (salesQuantity > userTotalStock) {
      const error = new Error("Sale quantity exceeds available stock.");
      error.code = 400;
      return next(error);

      // 총 보유량과 수정할 수량이 같을 경우 own 삭제
    } else if (salesQuantity === userTotalStock) {
      isOutOfStock = true;
    }

    const addQuantity = salesQuantity - isOwner.remainingQuantity;
    creatOwnQuantity = isOwner.remainingQuantity - salesQuantity;
    ownUpdateQuantity = ownQuantity - addQuantity;

    newReqBody.remainingQuantity = salesQuantity;
    newReqBody.totalQuantity = isOwner.totalQuantity + addQuantity;
  } else if (salesQuantity === 0) {
    const error = new Error("Action unsuccessful: No records were updated.");
    error.code = 400;
    return next(error);
  }

  req.body = newReqBody;
  assert(req.body, updateShopStruct);

  const ownData = {
    ownId,
    ownUpdateQuantity,
    isOutOfStock,
    isOwn,
    creatOwnQuantity,
  };

  req.body.ownData = ownData;
  req.body.userId = userId;
  req.body.cardId = isOwner.cardId;
  next();
}
