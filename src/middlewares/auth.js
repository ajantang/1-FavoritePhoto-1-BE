import { createCustomError } from "../lib/custom-error.js";
import shopRepository from "../repositories/shopRepository.js";
import ownRepository from "../repositories/ownRepository.js";

export function authMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }

  return next(createCustomError(401));
}

export async function authMiddlewareByShopIdParam(req, res, next) {
  const { shopId } = req.params;

  if (!shopId) {
    return next(createCustomError(400));
  }

  try {
    const shop = await shopRepository.findShopOwnerId(shopId);

    if (shop.User.id === req.session.userId) {
      return next();
    }

    return next(createCustomError(401));
  } catch (err) {
    return next(err);
  }
}

export async function authMiddlewareByCardIdParam(req, res, next) {
  const { cardId } = req.params;
  const userId = req.session.userId;

  if (!cardId) {
    return next(createCustomError(400));
  }

  try {
    const own = await ownRepository.findShopOwnerId({ userId, cardId });

    if (own) {
      return next();
    }

    return next(createCustomError(401));
  } catch (err) {
    return next(err);
  }
}
