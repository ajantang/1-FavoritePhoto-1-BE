import ownService from "../services/ownService.js";
import shopService from "../services/shopService.js";
import { createShopMapper } from "./mappers/shopMapper.js";

async function createShop(req, res, next) {
  const shop = await shopService.createShop(req.body);
  await ownService.update(req.body);
  const responseData = createShopMapper(shop);
  res.status(201).send(responseData);
}

export default { createShop };
