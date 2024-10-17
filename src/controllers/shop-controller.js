import exchangeService from "../services/exchange-service.js";
import ownService from "../services/ownService.js";
import shopService from "../services/shopService.js";
import {
  createShopMapper,
  getShopDetailMapper,
  getShopListMapper,
} from "./mappers/shopMapper.js";

async function createShop(req, res, next) {
  const shop = await shopService.createShop(req.body);
  const own = await ownService.update(req.body);
  const [shopResult, ownResult] = await Promise.all([shop, own]);
  const responseData = createShopMapper(shopResult);
  res.status(201).send(responseData);
}

async function getShopList(req, res, next) {
  const shops = await shopService.getShopListByQuery(req.query);
  const count = await shopService.countShopListByQuery(req.query);
  const [list, total] = await Promise.all([shops, count]);
  const responseData = getShopListMapper(list, total);
  res.send(responseData);
}

async function getShopDetail(req, res, next) {
  const { id } = req.params;
  const { userId } = req.body; // 인증 후 req.body에 userId 추가
  const shop = await shopService.getShopDetailById(id); // 상세정보 가져오기
  const isUserShopOwner = await shopService.checkUserShopOwner(userId, id); // 유저가 만든건지 확인
  let responseData = {};
  if (!isUserShopOwner) {
    const isExchange = await exchangeService.checkExchangeByUser(userId, id); // 교환 신청한게 있는지 확인
    responseData = getShopDetailMapper(shop, isExchange);
  }
  responseData = getShopDetail(shop);
  res.send(responseData);
}

export default { createShop, getShopList, getShopDetail };
