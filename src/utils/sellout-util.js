import { EXCHANGE_VOLUME } from "../constants/exchange.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import ownRepository from "../repositories/own-repository.js";
import prisma from "../repositories/prisma.js";

export async function exchangeDelete(
  shopDetailDataWithExchange,
  excludeExchangeId
) {
  const exchangesCardInfo = shopDetailDataWithExchange.Exchanges;

  await prisma.$transaction(async () => {
    const updateOrcreateOwn = await Promise.all(
      exchangesCardInfo.map(async (exchangeInfo) => {
        const userId = exchangeInfo.userId;
        const cardId = exchangeInfo.Card.id;

        if (exchangeInfo.id === excludeExchangeId) {
          return;
        }

        return await ownRepository.upsertData({
          where: {
            userId_cardId: { userId, cardId },
          },
          update: {
            quantity: { increment: EXCHANGE_VOLUME },
          },
          create: {
            userId,
            cardId,
            quantity: EXCHANGE_VOLUME,
          },
        });
      })
    );

    await exchangeRepository.deleteManyData({
      shopId: shopDetailDataWithExchange.id,
    });
  });
}
