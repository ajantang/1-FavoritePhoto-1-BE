import { CustomError } from "../lib/custom-error.js";

export function authMiddleware(req, res, next) {
  if (!req.session) {
    return next(CustomError(40100)); // 테스트 : CustomError(40198)
  }

  if (!req.session.userId) {
    return next(CustomError(40100)); // 테스트 : CustomError(40199)
  }

  if (req.session.role == "admin") {
    return next();
  }
}
