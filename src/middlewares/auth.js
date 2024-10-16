import { createCustomError } from "../lib/custom-error.js";

export function authMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }

  return next(createCustomError(401));
}
