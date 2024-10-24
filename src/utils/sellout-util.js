import exchangeRepository from "../repositories/exchange-repository.js";
import ownRepository from "../repositories/own-repository.js";
import prisma from "../repositories/prisma.js";

export async function exchangeDelete(shopDetailDataWithExchange) {
  const exchangesCardInfo = shopDetailDataWithExchange.Exchanges;

  await prisma.$transaction(async () => {
    const updateOrcreateOwn = await Promise.all(
      exchangesCardInfo.map(async (exchangeInfo) => {
        const userId = exchangeInfo.userId;
        const cardId = exchangeInfo.Card.id;

        return await ownRepository.upsertData({
          where: {
            userId_cardId: { userId, cardId },
          },
          update: {
            quantity: { increment: 1 },
          },
          create: {
            userId,
            cardId,
            quantity: 1,
          },
        });
      })
    );
    console.log({ updateOrcreateOwn });

    await exchangeRepository.deleteManyData({
      shopId: shopDetailDataWithExchange.id,
    });
  });
}
