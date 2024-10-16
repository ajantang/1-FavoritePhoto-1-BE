import e from "express";
import shopController from "../controllers/shop-controller.js";

const shopRouter = e.Router();

shopRouter.route("/").post(shopController.createShop);
