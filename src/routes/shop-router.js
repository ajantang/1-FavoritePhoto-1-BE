import express from "express";
import shopController from "../controllers/shop-controller.js";
import {
  checkShopCreatorByParams,
  validateCreateShopData,
  validatePurchaseConditions,
  validateUpdaeShopData,
} from "../middlewares/validate-data.js";
import {
  authMiddleware,
  authMiddlewareByShopIdParam,
  authMiddlewareByCardIdBody,
} from "../middlewares/auth.js";

const shopRouter = express.Router();

shopRouter
  .post("/", authMiddleware, validateCreateShopData, shopController.createShop)
  .get("/", shopController.getShopList)
  .get("/:shopId", shopController.getShopDetail)
  .patch(
    "/:shopId",
    authMiddleware,
    checkShopCreatorByParams,
    validateUpdaeShopData,
    shopController.updateShop
  )
  .delete(
    "/:shopId",
    authMiddleware,
    authMiddlewareByShopIdParam,
    shopController.deleteShop
  )
  .get(
    "/:shopId/quantity",
    authMiddleware,
    checkShopCreatorByParams,
    shopController.calculateTotalQuantity
  )
  .post(
    "/purchase",
    authMiddleware,
    validatePurchaseConditions,
    shopController.purchaseController
  )
  .post(
    "/exchange",
    authMiddleware,
    authMiddlewareByCardIdBody,
    shopController.createExchange
  );

export default shopRouter;
