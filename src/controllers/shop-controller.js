import e from "express";
import shopService from "../services/shopService.js";
import { createShopMapper } from "./mappers/shopMapper.js";

const shopRouter = e.Router();

shopRouter.route("/").post(async (req, res, next) => {
  // 인증 후 req.body에 userId 추가
  // req.body 유효성 검사 로직 추가 예정
  const shop = await shopService.createShop(req.body);
  const responseData = createShopMapper(shop);
  res.status(201).send(responseData);
});

export default shopRouter;
