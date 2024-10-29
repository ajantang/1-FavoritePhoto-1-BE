import exchangeService from "../services/exchange-service.js";
import shopService from "../services/shop-service.js";

async function createShop(req, res, next) {
  try {
    const shop = await shopService.createShop(req.body);

    res.status(201).send(shop);
  } catch (err) {
    return next(err);
  }
}

async function getShopList(req, res, next) {
  try {
    const userId = req.session?.userId || "";
    const query = req.query;
    const shops = await shopService.getShopList({ query, userId });

    res.status(200).send(shops);
  } catch (err) {
    return next(err);
  }
}

async function getShopDetail(req, res, next) {
  try {
    const { shopId } = req.params;
    const userId = req.session?.userId || "";

    const shop = await shopService.getShopDetail(userId, shopId);
    res.status(200).send(shop);
  } catch (err) {
    return next(err);
  }
}

async function updateShop(req, res, next) {
  try {
    const { shopId } = req.params;
    const shop = await shopService.updateShop(shopId, req.body);

    res.status(200).send(shop);
  } catch (err) {
    return next(err);
  }
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
  try {
    const userId = req.session.userId;
    const purchase = await shopService.purchaseService(userId, req.body);

    res.send(purchase);
  } catch (err) {
    return next(err);
  }
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
  try {
    const userId = req.session.userId;
    const shopData = req.body.shopData;
    const result = await shopService.calculateTotalQuantity(userId, shopData);

    res.send(result);
  } catch (err) {
    return next(err);
  }
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
