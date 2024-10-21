import { assert } from "superstruct";
import ownService from "../services/ownService.js";
import { createShopStruct, updateShopStruct } from "../structs/shopStruct.js";
import { SignUpUser, SignInUser } from "../structs/user-struct.js";
import shopService from "../services/shopService.js";
import userService from "../services/user-service.js";
import ownRepository from "../repositories/ownRepository.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import shopRepository from "../repositories/shopRepository.js";

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
  const { shopId } = req.params;
  const { salesQuantity, ...rest } = req.body;
  // 등록한 사람인지 확인
  const isOwner = await shopService.checkUserShopOwner(userId, shopId);

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

export async function validatePurchaseConditions(req, res, next) {
  const { shopId } = req.params;
  const userId = req.session.userId;
  const { purchaseQuantity } = req.body;

  // 상점 등록자인지 확인
  const isOwner = await shopService.checkUserShopOwner(userId, shopId);
  if (isOwner) {
    const error = new Error("You cannot purchase your own product.");
    error.code = 400;
    return next(error);
  }

  const shop = await shopService.getShopDetailById(shopId);
  const { remainingQuantity } = shop;
  const updatedShopQuantity = remainingQuantity - purchaseQuantity;
  let isSellOut = false;

  // 매진 여부 확인
  if (remainingQuantity === 0) {
    const error = new Error("This product is sold out.");
    error.code = 400;
    return next(error);

    // 구매량과 잔여 수량 대조
  } else if (remainingQuantity < purchaseQuantity) {
    const error = new Error("Insufficient stock for this product.");
    error.code = 400;
    return next(error);
  }

  // 구매 성공 시 매진 여부
  if (remainingQuantity === purchaseQuantity) {
    isSellOut = true;
  }

  const user = await userService.getUserInfoByUserId(userId);
  const totalPrice = purchaseQuantity * shop.price;

  // 총 판매가와 보유 포인트 대조
  if (totalPrice > user.point) {
    const error = new Error("Insufficient points to complete the purchase.");
    error.code = 402;
    return next(error);
  }

  // 구매자가 해당 카드를 소유하는지 확인
  const ownsCardWhere = { userId, cardId: shop.Card.id };
  const ownsCard = await ownRepository.findFirstData({ where: ownsCardWhere });

  req.body.sellerUserId = shop.userId;
  req.body.tradePoints = totalPrice;
  req.body.isSellOut = isSellOut;
  req.body.updatedShopQuantity = updatedShopQuantity;
  req.body.shopDetailData = shop;
  req.body.ownsCard = ownsCard;

  return next();
}

export async function validateExchangeConditions(req, res, next) {
  const { exchangeId } = req.params;
  const userId = req.session.userId;

  // exchange 테이블이 존재하는지 확인
  const exchange = await exchangeRepository.findUniqueOrThrowtData({
    where: {
      id: exchangeId,
    },
  });

  const cardId = exchange.cardId;
  const shopId = exchange.shopId;

  // 상점 오너인지 확인
  const shop = await shopRepository.findFirstData({
    where: {
      userId,
      id: shopId,
    },
  });

  if (shop === null || shop === undefined) {
    const error = new Error("You cannot purchase your own product.");
    error.code = 400;
    next(error);

    // 품절인지 확인
  } else if (shop.remainingQuantity === 0) {
    const error = new Error("This product is sold out.");
    error.code = 400;
    return next(error);
  }
}
