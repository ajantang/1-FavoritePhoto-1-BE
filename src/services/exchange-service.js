import prisma from "../repositories/prisma.js";
import ownRepository from "../repositories/ownRepository.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import { ownCardSelect } from "../repositories/selects/own-select.js";
import { exchangeCardShopSelect } from "../repositories/selects/exchange-select.js";
import { exchangeMapper } from "../controllers/mappers/exchange-mapper.js";

import { EXCHANGE_VOLUME } from "../constants/exchange.js";

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

async function acceptByExchange() {
  return await prisma.$transaction(async () => {
    // 상점의 잔여량 감소
    // 판매자에게 제시된 카드 보유 확인
    // 판매자에게 제시된 카드 보유량 증가 혹은 생성
    // 구매자의 제시한 카드 보유량 감소
    // 구매자가 교환을 시도했던 상점 카드 보유 확인
    // 구매자가 교환을 시도했던 상점 카드의 보유량 생성 혹은 증가
    // 관련된 알림 추가
    // 승인된 exchange 삭제
  })
}

export default { checkExchangeByUser, createExchange };
