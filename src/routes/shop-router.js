import express from "express";
import shopController from "../controllers/shop-controller.js";
import {
  checkShopCreator,
  validateCreateShopData,
  validatePurchaseConditions,
  validateUpdaeShopData,
} from "../middlewares/validateData.js";
import {
  authMiddleware,
  authMiddlewareByShopIdParam,
  authMiddlewareByCardIdBody,
} from "../middlewares/auth.js";

const shopRouter = express.Router();

shopRouter
  .route("/")
  .post(authMiddleware, validateCreateShopData, shopController.createShop)
  .get(shopController.getShopList);

shopRouter.post(
  "/exchange",
  authMiddleware,
  authMiddlewareByCardIdBody,
  shopController.createExchange
);

shopRouter
  .route("/:shopId")
  .get(shopController.getShopDetail)
  .patch(authMiddleware, validateUpdaeShopData, shopController.updateShop)
  .delete(
    authMiddleware,
    authMiddlewareByShopIdParam,
    shopController.deleteShop
  );

shopRouter
  .route("/:shopId/purchase")
  .post(
    authMiddleware,
    validatePurchaseConditions,
    shopController.purchaseController
  );

shopRouter
  .route("/:shopId/quantity")
  .get(authMiddleware, checkShopCreator, shopController.calculateTotalQuantity);

export default shopRouter;
