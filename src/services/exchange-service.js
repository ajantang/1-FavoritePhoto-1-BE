import prisma from "../repositories/prisma.js";
import ownRepository from "../repositories/own-repository.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import { ownCardSelect } from "../services/selects/own-select.js";
import { exchangeCardShopSelect } from "../services/selects/exchange-select.js";
import {
  exchangeCreateMapper,
  exchangeDecisionMapper,
} from "./mappers/exchange-mapper.js";

import { EXCHANGE_VOLUME } from "../constants/exchange.js";
import shopRepository from "../repositories/shop-repository.js";
import { exchangeDeleteAndCreateNotification } from "../utils/sellout-util.js";
import notificationRepository from "../repositories/notification-repository.js";
import { createNotificationMessage } from "../utils/notification-util.js";
import {
  EXCHANGE_PROPOSAL_INDEX,
  FAILES_EXCHANGE_INDEX,
  SUCCESSFUL_EXCHANGE_INDEX,
} from "../constants/notification.js";

async function checkExchangeByUser(userId, shopId) {
  const filter = {
    userId,
    shopId,
  };

  return await exchangeRepository.checkExchangeByUser(filter);
}

async function createExchange({ userId, shopId, cardId, description }) {
  return prisma.$transaction(async () => {
    try {
      const updateWhere = {
        userId_cardId: {
          userId,
          cardId,
        },
      };
      const updateData = {
        quantity: { decrement: EXCHANGE_VOLUME },
      };
      const update = await ownRepository.updateData({
        where: updateWhere,
        data: updateData,
        select: ownCardSelect,
      });

      if (update.quantity === 0) {
        const deleteWhere = { id: update.id };
        await ownRepository.deleteData(deleteWhere);
      }

      const shpoWhere = { id: shopId };
      const updateShopData = { hasExchangeRequest: true };
      await shopRepository.updateData({
        where: shpoWhere,
        data: updateShopData,
      });

      const exchangeData = { userId, shopId, cardId, description };

      const exchange = await exchangeRepository.createData({
        data: exchangeData,
        select: exchangeCardShopSelect,
      });

      const { message, sellerId } = await createNotificationMessage({
        idx: EXCHANGE_PROPOSAL_INDEX,
        userId,
        shopId,
      });

      const notification = await notificationRepository.createData({
        data: {
          userId: sellerId,
          shopId,
          message,
        },
      });

      return exchangeCreateMapper(exchange);
    } catch (e) {
      throw e;
    }
  });
}

async function acceptByExchange(userId, exchangeId, reqBody) {
  const {
    exchangeData,
    shopId,
    exchangeCardId,
    buyerId,
    shopDetailData,
    shopCardId,
  } = reqBody;

  return await prisma.$transaction(async () => {
    try {
      // 상점의 잔여량 감소
      const decreaseShopQuantity = await shopRepository.updateData({
        where: { id: shopId },
        data: {
          remainingQuantity: {
            decrement: 1,
          },
        },
      });

      // 판매자에게 제시된 카드 보유량 증가 혹은 생성
      const sellerOwn = await ownRepository.upsertData({
        where: {
          userId_cardId: {
            userId,
            cardId: exchangeCardId,
          },
        },
        update: {
          quantity: { increment: EXCHANGE_VOLUME },
        },
        create: {
          userId,
          cardId: exchangeCardId,
          quantity: EXCHANGE_VOLUME,
        },
      });

      // 구매자가 교환을 시도했던 상점 카드의 보유량 생성 혹은 증가
      const buyerOwn = await ownRepository.upsertData({
        where: {
          userId_cardId: {
            userId: buyerId,
            cardId: shopCardId,
          },
        },
        update: {
          quantity: { increment: EXCHANGE_VOLUME },
        },
        create: {
          userId: buyerId,
          cardId: shopCardId,
          quantity: EXCHANGE_VOLUME,
        },
      });

      // 승인된 exchange 삭제
      await exchangeRepository.deleteData({
        id: exchangeId,
      });

      // exchange 잔여 여부로 상점 정보 갱신
      const countExchangeOfShop = await exchangeRepository.countData({
        shopId,
      });

      // exchange 잔여량 0 > hasExchangeRequest : false
      if (countExchangeOfShop == 0) {
        const shpoWhere = { id: shopId };
        const updateShopData = { hasExchangeRequest: false };
        await shopRepository.updateData({
          where: shpoWhere,
          data: updateShopData,
        });
      }

      const { message } = await createNotificationMessage({
        idx: SUCCESSFUL_EXCHANGE_INDEX,
        shopId,
        userId,
      });

      const notification = await notificationRepository.createData({
        data: {
          userId: buyerId,
          shopId,
          message,
        },
      });

      // 매진 시 관련 exchange 삭제
      if (shopDetailData.remainingQuantity === 1) {
        await exchangeDeleteAndCreateNotification({
          sellout: true,
          shopDetailDataWithExchange: shopDetailData,
          excludeExchangeId: exchangeId,
        });
        // 상점 매진시 전체 exchange 삭제 0 > hasExchangeRequest : false
        const shpoWhere = { id: shopId };
        const updateShopData = { hasExchangeRequest: false };
        await shopRepository.updateData({
          where: shpoWhere,
          data: updateShopData,
        });
      }

      const responseMappeing = exchangeDecisionMapper(exchangeData);

      return {
        successStatus: true,
        ...responseMappeing,
      };
    } catch (e) {
      throw e;
    }
  });
}

async function refuseOrCancelExchange(exchangeId, reqBody) {
  const { exchangeData, exchangeCardId, shopId, buyerId } = reqBody;

  return await prisma.$transaction(async () => {
    try {
      const shop = await shopRepository.findUniqueOrThrowtData({
        where: { id: shopId },
      });

      const { message } = await createNotificationMessage({
        idx: FAILES_EXCHANGE_INDEX,
        userId: shop.userId,
        shopId,
      });

      const notification = await notificationRepository.createData({
        data: {
          userId: buyerId,
          shopId,
          message,
        },
      });

      const exchangeInfo = await exchangeRepository.findFirstData({
        where: { id: exchangeId },
      });

      // exchange 삭제
      const delteeExchange = await exchangeRepository.deleteData({
        id: exchangeId,
      });

      // exchange 잔여 여부로 상점 정보 갱신
      const countExchangeOfShop = await exchangeRepository.countData({
        shopId: exchangeInfo.shopId,
      });
      // exchange 잔여량 0 > hasExchangeRequest : false
      if (countExchangeOfShop === 0) {
        const shpoWhere = { id: exchangeInfo.shopId };
        const updateShopData = { hasExchangeRequest: false };
        await shopRepository.updateData({
          where: shpoWhere,
          data: updateShopData,
        });
      }

      // 교환 희망자의 own에 +1
      const own = await ownRepository.upsertData({
        where: {
          userId_cardId: {
            userId: buyerId,
            cardId: exchangeCardId,
          },
        },
        update: {
          quantity: { increment: EXCHANGE_VOLUME },
        },
        create: {
          userId: buyerId,
          cardId: exchangeCardId,
          quantity: EXCHANGE_VOLUME,
        },
      });

      const responseMappeing = exchangeDecisionMapper(exchangeData);

      return {
        successStatus: true,
        ...responseMappeing,
      };
    } catch (e) {
      throw e;
    }
  });
}

export default {
  checkExchangeByUser,
  createExchange,
  acceptByExchange,
  refuseOrCancelExchange,
};
