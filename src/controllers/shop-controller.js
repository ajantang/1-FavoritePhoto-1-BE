import exchangeService from "../services/exchange-service.js";
import shopService from "../services/shop-service.js";

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
  const userId = req.session.userId;

  const purchase = await shopService.purchaseService(userId, req.body);
  res.send(purchase);
}

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
