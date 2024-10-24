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
  .route("/")
  .post(authMiddleware, validateCreateShopData, shopController.createShop)
  .get(shopController.getShopList);

shopRouter
  .route("/:shopId")
  .get(shopController.getShopDetail)
  .patch(
    authMiddleware,
    checkShopCreatorByParams,
    validateUpdaeShopData,
    shopController.updateShop
  )
  .delete(
    authMiddleware,
    authMiddlewareByShopIdParam,
    shopController.deleteShop
  );

shopRouter.get(
  "/:shopId/quantity",
  authMiddleware,
  checkShopCreatorByParams,
  shopController.calculateTotalQuantity
);

shopRouter.post(
  "/purchase",
  authMiddleware,
  validatePurchaseConditions,
  shopController.purchaseController
);

shopRouter.post(
  "/exchange",
  authMiddleware,
  authMiddlewareByCardIdBody,
  shopController.createExchange
);

export default shopRouter;
