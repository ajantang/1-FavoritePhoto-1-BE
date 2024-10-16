import ownService from "../services/ownService.js";
import shopService from "../services/shopService.js";
import { createShopMapper, getShopListMapper } from "./mappers/shopMapper.js";

async function createShop(req, res, next) {
  const shop = await shopService.createShop(req.body);
  const own = await ownService.update(req.body);
  const [shopResult, ownResult] = await Promise.all([shop, own]);
  const responseData = createShopMapper(shopResult);
  res.status(201).send(responseData);
}

async function getShopList(req, res, next) {
  const shops = await shopService.getShopListByFilter(req.query);
  const count = await shopService.countShopListByFilter(req.query);
  const [list, total] = await Promise.all([shops, count]);
  const responseData = getShopListMapper(list, total)
  res.send(responseData);
}

export default { createShop, getShopList };
