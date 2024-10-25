import { EXCHANGE_VOLUME } from "../constants/exchange.js";
import {
  FAILES_EXCHANGE_INDEX,
  SOLD_OUT_INDEX,
} from "../constants/notification.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import notificationRepository from "../repositories/notification-repository.js";
import ownRepository from "../repositories/own-repository.js";
import prisma from "../repositories/prisma.js";
import { createNotificationMessage } from "./notification-util.js";

export async function exchangeDelete(
  shopDetailDataWithExchange,
  excludeExchangeId
) {
  const exchangesCardInfo = shopDetailDataWithExchange.Exchanges;
  const sellerUserId = shopDetailDataWithExchange.userId;
  const shopId = shopDetailDataWithExchange.id;

  await prisma.$transaction(async () => {
    const updateOrcreateOwn = await Promise.all(
      exchangesCardInfo.map(async (exchangeInfo) => {
        const userId = exchangeInfo.userId;
        const cardId = exchangeInfo.Card.id;

        if (exchangeInfo.id === excludeExchangeId) {
          return;
        }

        const own = await ownRepository.upsertData({
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

        const { message } = await createNotificationMessage({
          idx: FAILES_EXCHANGE_INDEX,
          userId: sellerUserId,
          shopId,
        });

        return { userId, shopId, message };
      })
    );

    const failseExchange = await notificationRepository.createManyData({
      data: updateOrcreateOwn,
      skipDuplicates: true,
    });

    const { message } = await createNotificationMessage({
      idx: SOLD_OUT_INDEX,
      shopId,
    });

    const sellOut = await notificationRepository.createData({
      data: {
        userId: sellerUserId,
        shopId,
        message,
      },
    });

    await exchangeRepository.deleteManyData({
      shopId,
    });
  });
}
