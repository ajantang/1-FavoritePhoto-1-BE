import express from "express";
import shopController from "../controllers/shop-controller.js";
import { validateCreateShopData } from "../middlewares/validateData.js";

const shopRouter = express.Router();

shopRouter.route("/").post(validateCreateShopData, shopController.createShop); // 인증 후 req.body에 userId 추가

export default shopRouter;
