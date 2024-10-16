import shopService from "../services/shopService.js";
import { createShopMapper } from "./mappers/shopMapper.js";

async function createShop(req, res, next) {
  const shop = await shopService.createShop(req.body);
  const responseData = createShopMapper(shop);
  // 해당 유저의 해당 카드 보유량 수정 코드 작성
  res.status(201).send(responseData);
}

export default { createShop };
