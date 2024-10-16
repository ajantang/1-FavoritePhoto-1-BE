import { createCustomError } from "../lib/custom-error.js";

export function authMiddleware(req, res, next) {
  if (!req.session) {
    return next(createCustomError(401));
  }

  if (!req.session.userId) {
    return next(createCustomError(401));
  }

  if (req.session.role == "admin") {
    return next();
  }
}
