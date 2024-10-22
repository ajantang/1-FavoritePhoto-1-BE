import prisma from "../repositories/prisma.js";
import ownRepository from "../repositories/ownRepository.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import { ownCardSelect } from "../repositories/selects/own-select.js";
import { exchangeCardShopSelect } from "../repositories/selects/exchange-select.js";
import { exchangeMapper } from "../controllers/mappers/exchange-mapper.js";

import { EXCHANGE_VOLUME } from "../constants/exchange.js";
import shopRepository from "../repositories/shopRepository.js";

async function checkExchangeByUser(userId, shopId) {
  const filter = {
    userId,
    shopId,
  };

  return await exchangeRepository.checkExchangeByUser(filter);
}

async function createExchange({ userId, shopId, cardId, description }) {
  return prisma.$transaction(async () => {
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

    const exchangeData = { userId, shopId, cardId, description };

    const exchange = await exchangeRepository.createData({
      data: exchangeData,
      select: exchangeCardShopSelect,
    });

    return exchangeMapper(exchange);
  });
}

async function acceptByExchange(userId, exchangeId, reqBody) {
  const {
    exchangeData,
    shopId,
    exchangeCardId,
    buyerId,
    shopCardId,
    hasSellerExchangeCard,
    hasBuyershopCard,
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
      if (
        hasSellerExchangeCard === null ||
        hasSellerExchangeCard == undefined
      ) {
        const createSellerOwn = await ownRepository.createData({
          data: {
            userId,
            cardId: exchangeCardId,
            quantity: 1,
          },
        });
      } else {
        const increaseSellerCard = await ownRepository.updateData({
          where: {
            id: hasSellerExchangeCard.id,
          },
          data: {
            quantity: { increment: 1 },
          },
        });
      }

      // 구매자가 교환을 시도했던 상점 카드의 보유량 생성 혹은 증가
      if (hasBuyershopCard === null || hasBuyershopCard === undefined) {
        const createBuyerOwn = await ownRepository.createData({
          data: {
            userId: buyerId,
            cardId: shopCardId,
            quantity: 1,
          },
        });
      } else {
        const increaseBuyerCard = await ownRepository.updateData({
          where: {
            id: hasBuyershopCard.id,
          },
          data: {
            quantity: { increment: 1 },
          },
        });
      }

      // 승인된 exchange 삭제
      const delteeExchange = await exchangeRepository.deleteData({
        id: exchangeId,
      });

      const responseMappeing = exchangeMapper(exchangeData);

      return {
        successStatus: true,
        ...responseMappeing,
      };

      // 관련된 알림 추가
    } catch (e) {
      throw e;
    }
  });
}

async function refuseByExchange(exchangeId, reqBody) {
  const { exchangeData, exchangeCardId, buyerId } = reqBody;

  return await prisma.$transaction(async () => {
    try {
      // exchange 삭제
      const delteeExchange = await exchangeRepository.deleteData({
        id: exchangeId,
      });
      console.log(delteeExchange);

      // 교환 희망자의 own에 +1
      const own = await ownRepository.updateData({
        where: {
          userId_cardId: {
            userId: buyerId,
            cardId: exchangeCardId,
          },
        },
        data: {
          quantity: { increment: 1 },
        },
      });

      const responseMappeing = exchangeMapper(exchangeData);

      return {
        successStatus: true,
        ...responseMappeing,
      };
    } catch (e) {
      throw e;
    }
  });
  // 관련 알림 등록
}

export default {
  checkExchangeByUser,
  createExchange,
  acceptByExchange,
  refuseByExchange,
};
