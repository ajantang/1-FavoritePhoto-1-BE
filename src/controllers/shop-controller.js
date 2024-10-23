import exchangeService from "../services/exchange-service.js";
import ownService from "../services/own-service.js";
import shopService from "../services/shop-service.js";
import {
  createShopMapper,
  getShopDetailMapper,
  getShopListMapper,
} from "../services/mappers/shop-mapper.js";

async function createShop(req, res, next) {
  const shop = await shopService.createShop(req.body);
  res.status(201).send(shop);
}

async function getShopList(req, res, next) {
  const shops = await shopService.getShopList(req.query);
  res.status(200).send(shops);
}

async function getShopDetail(req, res, next) {
  const { shopId } = req.params;
  const userId = req.session?.userId || "";
  const shop = await shopService.getShopDetail(userId, shopId);
  res.status(200).send(shop);
}

async function updateShop(req, res, next) {
  const { shopId } = req.params;
  const shop = await shopService.updateShop(shopId, req.body);
  res.status(200).send(shop);
}

async function deleteShop(req, res, next) {
  try {
    const { shopId } = req.params;
    const userId = req.session.userId;
    const result = await shopService.deleteShop({ userId, shopId });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function purchaseController(req, res, next) {
  const { shopId } = req.params;
  const userId = req.session.userId;

  const purchase = await shopService.purchaseService(shopId, userId, req.body);
  res.send(purchase);
  // 구매 관련 알림 추가(구매자, 판매자).
  // 교환 취소 알림 추가
  // 매진 됐을 시 알람
}
// 오너가 아닌지 확인
// 매진 여부 확인
// 구매량과 잔여량 확인
// 총 판매가와 보유 포인트 확인
// 구매자가 해당 카드를 소유하는지 확인
// 구매자 포인트 차감
// 구매자 카드 추가
// 판매자 포인투 추가
// 상점 잔여량 차감
// 매진시 교환 신청 삭제
// 구매 이력 추가


async function createExchange(req, res, next) {
  try {
    const { shopId, cardId, description } = req.body;
    const userId = req.session.userId;
    const result = await exchangeService.createExchange({
      userId,
      shopId,
      cardId,
      description,
    });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function calculateTotalQuantity(req, res, next) {
  const userId = req.session.userId;
  const shopData = req.body.shopData;
  console.log(1);

  const result = await shopService.calculateTotalQuantity(userId, shopData);

  res.send(result);
}

export default {
  createShop,
  getShopList,
  getShopDetail,
  updateShop,
  purchaseController,
  deleteShop,
  createExchange,
  calculateTotalQuantity,
};
