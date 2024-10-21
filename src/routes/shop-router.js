import express from "express";
import shopController from "../controllers/shop-controller.js";
import {
  validateCreateShopData,
  validatePurchaseConditions,
  validateUpdaeShopData,
} from "../middlewares/validateData.js";
import { authMiddleware } from "../middlewares/auth.js";

const shopRouter = express.Router();

shopRouter
  .route("/")
  .post(authMiddleware, validateCreateShopData, shopController.createShop)
  .get(shopController.getShopList);

shopRouter
  .route("/:shopId")
  .get(shopController.getShopDetail)
  .patch(authMiddleware, validateUpdaeShopData, shopController.updateShop);

shopRouter
  .route("/:shopId/purchase")
  .post(authMiddleware, validatePurchaseConditions, shopController.purchaseController);

export default shopRouter;
