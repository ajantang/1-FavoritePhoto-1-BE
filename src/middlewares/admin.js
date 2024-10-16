import { getCookie } from "cookies-next";
import { verifyAccessToken } from "../lib/token.js";

import { adminIds } from "../constants/admin.js";

// 임시로 어드민 미들웨어 생성
export function adminAuthMiddleware(req, res, next) {
  const token = getCookie("accessToken", { req });

  if (!token) {
    return res.status(401).json({ message: "Unauthorized : need admin count" });
  }

  const verifiedData = verifyAccessToken(token);

  if (!verifiedData) {
    return res.status(401).json({ message: "Unauthorized : need admin count" });
  }

  if (!adminIds.includes(verifiedData.id)) {
    return res.status(401).json({ message: "Unauthorized : need admin count" });
  }

  next();
}
