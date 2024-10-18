import { createCustomError } from "../lib/custom-error.js";
import shopRepository from "../repositories/shopRepository.js";

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
