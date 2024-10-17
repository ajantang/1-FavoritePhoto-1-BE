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
  // 보유량에서 0이되면 delete
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
  // 보유량 + 판매량
  const { id } = req.params;
  const userId = req.session?.userId || "";
  const shop = await shopService.getShopDetailById(id);
  const isUserShopOwner = await shopService.checkUserShopOwner(userId, id);
  const [data, isowner] = await Promise.all([shop, isUserShopOwner]);
  let responseData = {};
  if (!isowner) {
    const isExchange = await exchangeService.checkExchangeByUser(userId, id);
    responseData = getShopDetailMapper(data, isExchange);
  } else {
    responseData = getShopDetailMapper(data);
  }
  res.send(responseData);
}

async function updateShop(req, res, next) {
  const { id } = req.params;
  // 유효성 검사 필요
  // 유저가 등록자인지 검사
  // 보유량 총합
  // 보유량에서 0이되면 delete
  const shop = await shopService.updateShop(id, req.body);
  // 수량 관련 업데이트 시 own도 업데이트하는 코드 필요
}

export default { createShop, getShopList, getShopDetail, updateShop };
