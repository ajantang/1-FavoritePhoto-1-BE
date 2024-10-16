import e from "express";
import shopController from "../controllers/shop-controller.js";
import validateData from "../middlewares/validateData.js";

const shopRouter = e.Router();

shopRouter.route("/").post(validateData.createShop, shopController.createShop); // 인증 후 req.body에 userId 추가

export default shopRouter;
