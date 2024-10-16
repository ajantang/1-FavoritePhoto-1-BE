import ownService from "../services/ownService.js";
import shopService from "../services/shopService.js";
import { createShopMapper } from "./mappers/shopMapper.js";

async function createShop(req, res, next) {
  const shop = await shopService.createShop(req.body);
  const own = await ownService.update(req.body);
  const [shopResult, ownResult] = await Promise.all([shop, own]);
  const responseData = createShopMapper(shopResult);
  res.status(201).send(responseData);
}

async function getList(req, res, next) {
  const shops = await shopService.getByFilter(req.query);
  res.send(shops);
}

export default { createShop, getList };
