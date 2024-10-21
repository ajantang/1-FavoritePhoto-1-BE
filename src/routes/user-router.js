import express from "express";

import userController from "../controllers/users-controller.js";
import {
  authMiddleware,
  authMiddlewareByCardIdParam,
} from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter
  .get("/my-cards", authMiddleware, userController.getMyCardList)
  .get(
    "/my-cards/:cardId",
    authMiddleware,
    authMiddlewareByCardIdParam,
    userController.getMyCard
  )
  .post("/my-cards", authMiddleware, userController.createMyCard)
  .get("/my-cards/shop", authMiddleware, userController.getMyShopList)
  .get("/my-cards/exchange", authMiddleware, userController.getMyRequestList)
  .get("/profile", (req, res, next) => {
    // 내 프로필 조회
  })
  .get("/check-email", (req, res, next) => {
    // 이메일 중복 확인 (리턴 방식/데이터 죠율 필요)
  })
  .get("/check-nickname", (req, res, next) => {
    // 닉네임 중복 확인 (리턴 방식/데이터 죠율 필요)
  });

export default userRouter;
