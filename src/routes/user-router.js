import express from "express";

import userController from "../controllers/users-controller.js";
import {
  authMiddleware,
  authMiddlewareByCardIdParam,
} from "../middlewares/auth.js";
import { validateCreateCardData } from "../middlewares/validate-data.js";

const userRouter = express.Router();

userRouter
  .get("/my-cards", authMiddleware, userController.getMyCardList)
  .get(
    "/my-cards/:cardId",
    authMiddleware,
    authMiddlewareByCardIdParam,
    userController.getMyCard
  )
  .post(
    "/my-cards",
    authMiddleware,
    validateCreateCardData,
    userController.createMyCard
  )
  .get("/exchange", authMiddleware, userController.getMyExchangeList)
  .get("/shop", authMiddleware, userController.getMyShopList)
  .get("/my-info", authMiddleware, userController.getMyInfo)
  .get("/notifications", authMiddleware, userController.getMyNotificationList)
  .get("/check-email", (req, res, next) => {
    // 이메일 중복 확인 (리턴 방식/데이터 죠율 필요)
  })
  .get("/check-nickname", (req, res, next) => {
    // 닉네임 중복 확인 (리턴 방식/데이터 죠율 필요)
  });

export default userRouter;
