import { CustomError } from "../lib/custom-error.js";
import ownRepository from "../repositories/own-repository.js";
import shopRepository from "../repositories/shop-repository.js";
import notificationRepository from "../repositories/notification-repository.js";

export function authMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }

  return next(CustomError(40100));
}

export async function authMiddlewareByShopIdParam(req, res, next) {
  const { shopId } = req.params;

  if (!shopId) {
    return next(CustomError(40010));
  }

  try {
    const shop = await shopRepository.findUniqueOrThrowtData({
      where: { id: shopId },
    });

    if (shop.userId === req.session.userId) {
      return next();
    }

    return next(CustomError(40302));
  } catch (err) {
    return next(err);
  }
}

export async function authMiddlewareByCardIdParam(req, res, next) {
  const { cardId } = req.params;
  const userId = req.session.userId;

  if (!cardId) {
    return next(CustomError(40011));
  }

  const isOwner = await haveCard({ userId, cardId });

  if (!isOwner) {
    return next(CustomError(40301));
  }

  return next();
}

export async function authMiddlewareByCardIdBody(req, res, next) {
  const { cardId } = req.body;
  const userId = req.session.userId;

  if (!cardId) {
    return next(CustomError(40011));
  }

  const isOwner = await haveCard({ userId, cardId });

  if (!isOwner) {
    return next(CustomError(40301));
  }

  return next();
}

export async function authMiddlewareByNotificationIdParam(req, res, next) {
  const { notificationId } = req.params;
  const userId = req.session.userId;

  if (!notificationId) {
    return next(CustomError(40009));
  }

  const isOwner = await isNotificationOwner({ userId, notificationId });

  if (!isOwner) {
    return next(CustomError(40109));
  }

  return next();
}

// 임시. repo 함수는 layered 구조로 로직 변경 예정
async function haveCard({ userId, cardId }) {
  const where = { cardId, userId };

  return await ownRepository.findFirstData({ where });
}

async function isNotificationOwner({ userId, notificationId }) {
  const where = { id: notificationId, userId };

  return await notificationRepository.findFirstData({ where });
}
