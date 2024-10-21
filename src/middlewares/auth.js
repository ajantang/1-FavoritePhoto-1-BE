import { createCustomError } from "../lib/custom-error.js";
import ownRepository from "../repositories/ownRepository.js";
import shopRepository from "../repositories/shopRepository.js";
import { ownSelect } from "../repositories/selects/own-select.js";

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
  const { cardId } = req.body;

  if (!cardId) {
    return next(createCustomError(400));
  }

  try {
    const where = { cardId, userId: req.session.userId };
    await ownRepository.findUniqueOrThrowtData({
      where,
      select: ownSelect,
    });

    return next();
  } catch (err) {
    return next(err);
  }
}
