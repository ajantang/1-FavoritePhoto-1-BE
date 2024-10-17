import express from "express";
import shopController from "../controllers/shop-controller.js";
import { validateCreateShopData } from "../middlewares/validateData.js";
import { authMiddleware } from "../middlewares/auth.js";

const shopRouter = express.Router();

shopRouter
  .route("/")
  .post(authMiddleware, validateCreateShopData, shopController.createShop)
  .get(shopController.getShopList);

shopRouter.route("/:id").get(shopController.getShopDetail);

export default shopRouter;
