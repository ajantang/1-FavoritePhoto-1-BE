// import jwt from "jsonwebtoken";

// import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/token";

// export function createAccessToken(userId) {
//   return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
// }

// export function createRefreshToken(userId) {
//   return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
// }

// export function verifyAccessToken(token) {
//   try {
//     return jwt.verify(token, ACCESS_TOKEN_SECRET);
//   } catch (err) {
//     return null;
//   }
// }

// export function verifyRefreshToken(token) {
//   try {
//     return jwt.verify(token, REFRESH_TOKEN_SECRET);
//   } catch (err) {
//     return null;
//   }
// }
