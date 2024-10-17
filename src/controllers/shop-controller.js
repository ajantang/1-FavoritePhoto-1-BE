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
  // 카드를 보유하고 있는지 확인하는 코드 추가
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
  // 보유량 + 총판매량
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
  const shop = await shopService.updateShop(id, req.body);
  const responseData = createShopMapper(shop);
  res.send(responseData);
}

async function purchaseController(req, res, next) {
  const { id } = req.params;
  const userId = req.session.userId;
  const { purchaseQuantity } = req.body;
  
  // 구매자 포인트 차감
  // 상점 잔여수량 차감
  // 구매자 해당 카드 보유 추가
  // 상점 잔여 수량이 0이 될 시 매진 표시
  // 매진 시 교환 신청 삭제
  // 구매 관련 알림 추가(구매자, 판매자).
  // 교환 취소 알림 추가
}

export default {
  createShop,
  getShopList,
  getShopDetail,
  updateShop,
  purchaseController,
};
