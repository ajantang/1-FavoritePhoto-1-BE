import card from "../constants/card.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import ownRepository from "../repositories/own-repository.js";
import prisma from "../repositories/prisma.js";
import purchaseRepository from "../repositories/purchase-repository.js";
import shopRepository from "../repositories/shop-repository.js";
import userRepository from "../repositories/user-repository.js";
import { basicCardMapper, myCardMapper } from "./mappers/card-mapper.js";
import {
  ownCardListSelect,
  ownCardSelect,
} from "../services/selects/own-select.js";
import { exchangeDelete } from "../utils/sellout-util.js";
import {
  shopCreateSelect,
  shopDetailSelect,
  shopListSelect,
} from "./selects/shop-select.js";
import {
  createShopMapper,
  getShopDetailMapper,
  getShopListMapper,
} from "./mappers/shop-mapper.js";
import { createShopListFilterByQuery } from "../utils/query-util.js";
import shop from "../constants/shop.js";
import { exchangeCardInfo } from "./selects/exchange-select.js";

async function createShop(createData) {
  const { own, ...rest } = createData;
  return await prisma.$transaction(async () => {
    try {
      // 상점 등록
      const shop = await shopRepository.createData({
        data: rest,
        select: shopCreateSelect,
      });
      console.log(shop);

      // 보유량 감소 혹은 삭제
      if (rest.remainingQuantity === own.quantity) {
        const deleteOwn = await ownRepository.deleteData({ id: own.id });
        console.log(deleteOwn);
      } else {
        const updateOwn = await ownRepository.updateData({
          where: { id: own.id },
          data: {
            quantity: { decrement: rest.remainingQuantity },
          },
        });
        console.log(updateOwn);
      }

      return createShopMapper(shop);
    } catch (e) {
      throw e;
    }
  });
}

async function getShopList(query) {
  return await prisma.$transaction(async () => {
    try {
      const filterOptions = createShopListFilterByQuery(query);
      const shopList = await shopRepository.findManyByPaginationData({
        ...filterOptions,
        select: shopListSelect,
      });
      console.log(shopList);

      const count = await shopRepository.conutData(filterOptions.where);
      console.log(count);

      return getShopListMapper(shopList, count);
    } catch (e) {
      throw e;
    }
  });
}

async function getShopDetail(userId, shopId) {
  return await prisma.$transaction(async () => {
    try {
      const shop = await shopRepository.findUniqueOrThrowtData({
        where: { id: shopId },
        select: shopDetailSelect,
      });
      console.log(shop);
      const isOwner = await shopRepository.findFirstData({
        where: {
          id: shopId,
          userId,
        },
      });
      console.log(isOwner);

      let isExchanges = null;
      if (isOwner === null || isOwner === undefined) {
        isExchanges = await exchangeRepository.findManyData({
          where: {
            userId,
            shopId,
          },
          select: exchangeCardInfo,
        });
        console.log(isExchanges);
      }

      return getShopDetailMapper(shop, isExchanges);
    } catch (e) {
      throw e;
    }
  });
}

async function updateShop(shopId, updateData) {
  const { ownData, userId, cardId, ...rest } = updateData;
  const {
    ownId,
    ownIncrementQuantity,
    isOutOfStock,
    creatOwnQuantity,
    isQuantityChanged,
  } = ownData;

  return await prisma.$transaction(async () => {
    const shop = await shopRepository.updateData({
      where: { id: shopId },
      data: rest,
      select: shopCreateSelect,
    });
    console.log(shop);

    // 판매 수량을 최대치로 변경 시
    if (isOutOfStock) {
      await ownRepository.deleteData({ id: ownId });

      // 판매 수량이 수정됐을 때
    } else if (isQuantityChanged) {
      const own = await ownRepository.upsertData({
        where: { id: ownId },
        update: {
          quantity: { increment: ownIncrementQuantity },
        },
        create: {
          userId,
          cardId,
          quantity: creatOwnQuantity,
        },
      });
      console.log(own);
    }

    return createShopMapper(shop);
  });
}

async function deleteShop({ userId, shopId }) {
  return await prisma.$transaction(async () => {
    const shop = await shopRepository.findUniqueOrThrowtData({
      where: { id: shopId },
    });
    const own = await ownRepository.upsertData({
      where: {
        userId_cardId: {
          userId,
          cardId: shop.cardId,
        },
      },
      update: {
        quantity: { increment: shop.remainingQuantity },
      },
      create: {
        userId,
        cardId: shop.cardId,
        quantity: shop.remainingQuantity,
      },
      select: ownCardSelect,
    });

    await shopRepository.deleteData({ id: shopId });

    return myCardMapper(own);
  });
}

async function purchaseService(userId, purchaseData) {
  const {
    shopId,
    purchaseQuantity,
    sellerUserId,
    tradePoints,
    shopDetailData,
  } = purchaseData;

  return await prisma.$transaction(async () => {
    try {
      // 구매자 포인트 차감
      const decreasePoint = await userRepository.updateData({
        where: { id: userId },
        data: {
          point: { decrement: tradePoints },
        },
      });
      console.log({ decreasePoint });

      // 판매자 포인트 증가
      const increasePoint = await userRepository.updateData({
        where: { id: sellerUserId },
        data: {
          point: { increment: tradePoints },
        },
      });
      console.log({ increasePoint });

      // 상점 잔여수량 차감
      const decreaseQuantity = await shopRepository.updateData({
        where: { id: shopId },
        data: {
          remainingQuantity: { decrement: purchaseQuantity },
        },
      });
      console.log({ decreaseQuantity });

      // 매진 시 교환 신청 삭제
      if (decreaseQuantity.remainingQuantity === 0) {
        await exchangeDelete(shopDetailData);
      }

      // 구매 이력 추가
      const purchase = await purchaseRepository.createData({
        data: {
          consumerId: sellerUserId,
          purchaserId: userId,
          cardId: shopDetailData.Card.id,
          purchaseVolumn: purchaseQuantity,
          cardPrice: shopDetailData.price,
        },
      });
      console.log({ purchase });

      // 구매자 해당 카드 보유 추가
      const updateOwnWhere = {
        userId,
        cardId: shopDetailData.Card.id,
      };
      const purchaserOwn = await ownRepository.upsertData({
        where: {
          userId_cardId: {
            userId,
            cardId: shopDetailData.Card.id,
          },
        },
        update: {
          quantity: { increment: purchaseQuantity },
        },
        create: {
          userId,
          cardId: shopDetailData.Card.id,
          quantity: purchaseQuantity,
        },
        select: ownCardListSelect,
      });

      const responseMapping = basicCardMapper(purchaserOwn);

      return {
        ...responseMapping,
        purchaseQuantity,
      };
    } catch (e) {
      throw e;
    }
  });
}

async function calculateTotalQuantity(userId, shopData) {
  const own = await ownRepository.findFirstData({
    where: {
      userId,
      cardId: shopData.cardId,
    },
  });
  const userStock = own ? own.quantity : 0;
  const totalQuantity = userStock + shopData.remainingQuantity;
  return { totalQuantity };
}

export default {
  createShop,
  getShopList,
  getShopDetail,
  updateShop,
  purchaseService,
  deleteShop,
  calculateTotalQuantity,
};
