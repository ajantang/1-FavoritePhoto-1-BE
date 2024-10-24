import { assert } from "superstruct";
import ownService from "../services/own-service.js";
import { createShopStruct, updateShopStruct } from "../structs/shop-struct.js";
import { SignUpUser, SignInUser } from "../structs/user-struct.js";
import shopService from "../services/shop-service.js";
import userService from "../services/user-service.js";
import ownRepository from "../repositories/own-repository.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import shopRepository from "../repositories/shop-repository.js";
import { exchangeCardShopAndUserSelect } from "../services/selects/exchange-select.js";
import { shopDetailSelect } from "../services/selects/shop-select.js";
import { CustomError } from "../lib/custom-error.js";
import userRepository from "../repositories/user-repository.js";

export async function validateCreateShopData(req, res, next) {
  const userId = req.session.userId;
  const { cardId, salesQuantity, ...rest } = req.body;

  // 등록자가 해당 카드를 보유중인지 확인
  const own = await ownRepository.findFirstData({
    where: {
      userId,
      cardId,
    },
  });
  console.log(own);

  const stock = own ? own.quantity : 0;

  // 등록하는 양이 보유량보다 적은 지 확인
  if (stock < salesQuantity) {
    next(CustomError(40001));
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
  assert(req.body, SignUpUser);

  return next();
}

export function validateSignInUserData(req, res, next) {
  assert(req.body, SignInUser);

  return next();
}

export async function checkShopCreatorByParams(req, res, next) {
  const { shopId } = req.params;
  const userId = req.session.userId;

  const isOwner = await shopRepository.findFirstData({
    where: {
      userId,
      id: shopId,
    },
  });

  if (isOwner === null || isOwner === undefined) {
    return next(CustomError(40102));
  }

  req.body.shopData = isOwner;

  next();
}

export async function validateUpdaeShopData(req, res, next) {
  const userId = req.session.userId;
  const { salesQuantity, shopData: isOwner, ...rest } = req.body;

  const { remainingQuantity } = isOwner;
  const newReqBody = { ...rest };

  let ownId;
  let ownIncrementQuantity;
  let isOutOfStock = false;
  let creatOwnQuantity;
  let isQuantityChanged = false;

  // 수량에 변경 사항이 있는지 확인
  if (salesQuantity !== remainingQuantity) {
    isQuantityChanged = true;
  }

  // req.body에 수량에 변경 사항이 있을 시
  if (isQuantityChanged) {
    // own이 있는 지 확인
    const own = await ownRepository.findFirstData({
      where: {
        userId,
        cardId: isOwner.cardId,
      },
    });

    const ownQuantity = own ? own.quantity : 0;
    const userTotalStock = remainingQuantity + ownQuantity;
    ownId = own ? own.id : "";

    // 총 보유량 보다 수정할 수량이 많을 경우
    if (salesQuantity > userTotalStock) {
      return next(CustomError(40002));

      // 총 보유량과 수정할 수량이 같을 경우 own 삭제
    } else if (salesQuantity === userTotalStock) {
      isOutOfStock = true;
    }

    const addQuantity = salesQuantity - remainingQuantity;
    creatOwnQuantity = remainingQuantity - salesQuantity;
    ownIncrementQuantity = -addQuantity;

    newReqBody.remainingQuantity = salesQuantity;
    newReqBody.totalQuantity = isOwner.totalQuantity + addQuantity;
  } else if (salesQuantity === 0) {
    return next(CustomError(40002));
  }

  req.body = newReqBody;
  assert(req.body, updateShopStruct);

  const ownData = {
    ownId,
    ownIncrementQuantity,
    isOutOfStock,
    creatOwnQuantity,
    isQuantityChanged,
  };

  req.body.ownData = ownData;
  req.body.userId = userId;
  req.body.cardId = isOwner.cardId;
  next();
}

export async function validatePurchaseConditions(req, res, next) {
  const userId = req.session.userId;
  const { purchaseQuantity, shopId } = req.body;

  // 상점 등록자인지 확인
  const isOwner = await shopRepository.findFirstData({
    where: {
      userId,
      id: shopId,
    },
  });
  console.log({ isOwner });
  if (isOwner) {
    return next(CustomError(40398));
  }

  const shop = await shopRepository.findUniqueOrThrowtData({
    where: { id: shopId },
    select: shopDetailSelect,
  });
  console.log({ shop });
  const { remainingQuantity } = shop;

  // 매진 여부 확인
  if (remainingQuantity === 0) {
    return next(CustomError(40003));

    // 구매량과 잔여 수량 대조
  } else if (remainingQuantity < purchaseQuantity) {
    return next(CustomError(40002));
  }

  const user = await userRepository.findUniqueOrThrowtData({
    where: { id: userId },
  });
  console.log({ user });

  const totalPrice = purchaseQuantity * shop.price;

  // 총 판매가와 보유 포인트 대조
  if (totalPrice > user.point) {
    return next(CustomError(40399));
  }

  req.body.sellerUserId = shop.userId;
  req.body.tradePoints = totalPrice;
  req.body.shopDetailData = shop;

  return next();
}

export async function validateExchangeAndOwner(req, res, next) {
  const { exchangeId } = req.params;
  const userId = req.session.userId;

  // exchange 테이블이 존재하는지 확인
  const exchange = await exchangeRepository.findUniqueOrThrowtData({
    where: {
      id: exchangeId,
    },
    select: exchangeCardShopAndUserSelect,
  });

  const exchangeCardId = exchange.Card.id;
  const shopId = exchange.shopId;
  const buyerId = exchange.userId;

  // 상점 오너인지 확인
  const isOwner = await shopRepository.findFirstData({
    where: {
      userId,
      id: shopId,
    },
  });

  if (isOwner === null || isOwner === undefined) {
    next(CustomError(40398));
  }

  req.body.exchangeData = exchange;
  req.body.exchangeCardId = exchangeCardId;
  req.body.shopId = shopId;
  req.body.buyerId = buyerId;

  next();
}

export async function validateExchangeConditions(req, res, next) {
  const userId = req.session.userId;
  const { exchangeCardId, shopId, buyerId } = req.body;

  // 품절인지 확인
  const shop = await shopRepository.findUniqueOrThrowtData({
    where: { id: shopId },
    select: shopDetailSelect,
  });

  if (shop.remainingQuantity === 0) {
    return next(CustomError(40003));
  }

  const shopCardId = shop.cardId;

  // 판매자가 제시된 카드를 보유히는지 확인하는 코드
  const hasSellerExchangeCard = await ownRepository.findFirstData({
    where: {
      cardId: exchangeCardId,
      userId,
    },
  });

  // 구매자가 교환을 시도했던 상점 카드 보유 확인
  const hasBuyershopCard = await ownRepository.findFirstData({
    where: {
      cardId: shopCardId,
      userId: buyerId,
    },
  });

  req.body.shopDetailData = shop;
  req.body.shopCardId = shopCardId;
  req.body.hasSellerExchangeCard = hasSellerExchangeCard;
  req.body.hasBuyershopCard = hasBuyershopCard;

  next();
}

export async function validateExchangeCreator(req, res, next) {
  const { exchangeId } = req.params;
  const userId = req.session.userId;

  // exchange 테이블이 존재하는지 확인
  const exchange = await exchangeRepository.findUniqueOrThrowtData({
    where: {
      id: exchangeId,
    },
    select: exchangeCardShopAndUserSelect,
  });

  const exchangeCardId = exchange.Card.id;
  const shopId = exchange.shopId;
  const buyerId = exchange.userId;

  // 교환 희망자인지 확인
  const exchangeCreator = await exchangeRepository.findFirstData({
    where: {
      userId,
      id: exchangeId,
    },
  });

  if (exchangeCreator === null || exchangeCreator === undefined) {
    next(CustomError(40397));
  }

  req.body.exchangeData = exchange;
  req.body.exchangeCardId = exchangeCardId;
  req.body.shopId = shopId;
  req.body.buyerId = buyerId;

  next();
}
