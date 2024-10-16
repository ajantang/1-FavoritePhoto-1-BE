// import { getCookie } from "cookies-next";
// import { verifyAccessToken } from "../lib/token";

// export function authMiddleware(req, res, next) {
//   const token = getCookie("accessToken", { req });

//   if (!token) {
//     return res.status(401).send({ message: "Unauthorized" });
//   }

//   const verifiedData = verifyAccessToken(token);

//   if (!verifiedData) {
//     return res.status(401).send({ message: "Unauthorized" });
//   }

//   req.userId = verifiedData.id;
//   next();
// }

// 공용 미들웨어(에러 처리 등) 외의 미들웨어는 routes 폴더 안 js에서 사용

import { createCustomError } from "../lib/custom-error";

export function authMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }

  return next(createCustomError(401));
}
