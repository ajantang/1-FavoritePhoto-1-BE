import card from "../constants/card.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import ownRepository from "../repositories/own-repository.js";
import prisma from "../repositories/prisma.js";
import purchaseRepository from "../repositories/purchase-repository.js";
import shopRepository from "../repositories/shop-repository.js";
import userRepository from "../repositories/user-repository.js";
import { basicCardMapper, myCardMapper } from "./mappers/card-mapper.js";
import { ownCardListSelect } from "../services/selects/own-select.js";
import { exchangeDelete } from "../utils/sellout-util.js";
import { shopCreateSelect } from "./selects/shop-select.js";
import { createShopMapper } from "./mappers/shop-mapper.js";

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
          where: {
            id: own.id,
          },
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

async function getShopListByQuery(query) {
  const {
    sort,
    genre,
    grade,
    sellout,
    pageNum,
    pageSize,
    keyword = "",
  } = query;

  const page = pageNum || 1;
  const pageSizeNum = pageSize || 15;
  const offset = (page - 1) * pageSizeNum;

  let orderBy;
  switch (sort) {
    case "recent":
      orderBy = { createdAt: "desc" }; // 최신순
      break;
    case "oldest":
      orderBy = { createdAt: "asc" }; // 오래된 순
      break;
    case "cheapest":
      orderBy = { price: "asc" }; // 가격이 낮은 순
      break;
    case "highest":
      orderBy = { price: "desc" }; // 가격이 높은 순
      break;
    default:
      orderBy = { createdAt: "desc" }; // 기본값: 최신순
  }

  const whereOrBody = {
    contains: keyword,
    mode: "insensitive",
  };
  const whereOr = {
    OR: [
      {
        name: whereOrBody,
      },
      {
        description: whereOrBody,
      },
    ],
  };

  let selloutWhere = null;
  if (sellout === "true") {
    selloutWhere = { remainingQuantity: 0 };
  } else if (sellout === "false") {
    selloutWhere = { remainingQuantity: { gt: 0 } };
  }

  const where = {
    Card: {
      ...(genre ? { genre: parseInt(genre) } : {}),
      ...(grade ? { grade: parseInt(grade) } : {}),
      ...whereOr,
    },
    ...(selloutWhere && selloutWhere),
  };

  const filterOptions = {
    orderBy,
    skip: parseInt(offset),
    take: parseInt(pageSizeNum),
    where,
  };

  return await shopRepository.getShopListByQuery(filterOptions);
}

async function countShopListByQuery(query) {
  const { genre, grade, sellout, keyword = "" } = query;

  const whereOrBody = {
    contains: keyword,
    mode: "insensitive",
  };
  const whereOr = {
    OR: [
      {
        name: whereOrBody,
      },
      {
        description: whereOrBody,
      },
    ],
  };

  let selloutWhere = null;
  if (sellout === "true") {
    selloutWhere = { remainingQuantity: 0 };
  } else if (sellout === "false") {
    selloutWhere = { remainingQuantity: { gt: 0 } };
  }

  const filter = {
    Card: {
      ...(genre ? { genre: parseInt(genre) } : {}),
      ...(grade ? { grade: parseInt(grade) } : {}),
      ...whereOr,
    },
    ...(selloutWhere && selloutWhere),
  };

  return await shopRepository.countShopListByQuery(filter);
}

async function getShopDetailById(id) {
  return await shopRepository.getShopDetailById(id);
}

async function checkUserShopOwner(userId, shopId) {
  const filter = {
    userId,
    id: shopId,
  };

  return await shopRepository.checkUserShopOwner(filter);
}

// service 파일 내에서 사용
async function updateOrDeleteOwn(id, updateData) {
  const { ownData, userId, cardId, ...rest } = updateData;
  const { ownId, ownUpdateQuantity, isOutOfStock } = ownData;

  const where = { id: ownId };
  const updateQuantity = { quantity: ownUpdateQuantity };

  if (isOutOfStock) {
    return await prisma.$transaction(async () => {
      const shop = await shopRepository.updateShop(id, rest);
      const q = await ownRepository.deleteById(ownId);

      return shop;
    });
  } else if (!isOutOfStock) {
    return await prisma.$transaction(async () => {
      const shop = await shopRepository.updateShop(id, rest);
      const q = await ownRepository.update(where, updateQuantity);

      return shop;
    });
  }
}

async function updateShop(id, updateData) {
  const { ownData, userId, cardId, ...rest } = updateData;
  const { ownId, isOwn, creatOwnQuantity } = ownData;
  if (ownId) {
    return await updateOrDeleteOwn(id, updateData);
  } else if (!isOwn) {
    return await prisma.$transaction(async () => {
      const createOwnData = {
        userId,
        cardId,
        quantity: creatOwnQuantity,
      };
      const shop = await shopRepository.updateShop(id, rest);
      const q = await ownRepository.createOwn(createOwnData);

      return shop;
    });
  } else {
    return await shopRepository.updateShop(id, rest);
  }
}

async function purchaseService(id, userId, purchaseData) {
  const {
    purchaseQuantity,
    sellerUserId,
    tradePoints,
    updatedShopQuantity,
    shopDetailData,
    ownsCard,
  } = purchaseData;

  return await prisma.$transaction(async () => {
    try {
      // 구매자 포인트 차감
      const decreasePoint = await userRepository.decreaseUserPoint({
        id: userId,
        lostPoint: tradePoints,
      });

      // 판매자 포인트 증가
      const increasePoint = await userRepository.increaseUserPoint({
        id: sellerUserId,
        earnedPoint: tradePoints,
      });

      // 상점 잔여수량 차감
      const quantityData = { remainingQuantity: updatedShopQuantity };
      const decreaseQuantity = await shopRepository.updateShop(
        id,
        quantityData
      );

      // 매진 시 교환 신청 삭제
      if (updatedShopQuantity === 0) {
        await exchangeDelete(shopDetailData);
      }

      // 구매 이력 추가
      const createpurchaseData = {
        consumerId: sellerUserId,
        purchaserId: userId,
        cardId: shopDetailData.Card.id,
        purchaseVolumn: purchaseQuantity,
        cardPrice: shopDetailData.price,
      };
      const purchase = await purchaseRepository.create(createpurchaseData);

      // 구매자 해당 카드 보유 추가
      const updateOwnWhere = {
        userId,
        cardId: shopDetailData.Card.id,
      };
      let purchaserOwn;
      if (ownsCard === null || ownsCard === undefined) {
        const createOwnData = { ...updateOwnWhere, quantity: purchaseQuantity };
        purchaserOwn = await ownRepository.createData({
          data: createOwnData,
        });
      } else {
        const updateOwnData = { quantity: { increment: purchaseQuantity } };
        purchaserOwn = await ownRepository.updateData({
          where: {
            userId_cardId: {
              ...updateOwnWhere,
            },
          },
          data: updateOwnData,
          select: ownCardListSelect,
        });
      }

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

async function deleteShop({ userId, shopId }) {
  return prisma.$transaction(async () => {
    const shop = await shopRepository.getShopDetailById(shopId);
    const own = await ownRepository.addQuantity({
      userId,
      cardId: shop.Card.id,
      increment: shop.remainingQuantity,
    });

    await shopRepository.deleteShop(shopId);

    return myCardMapper(own);
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
  getShopListByQuery,
  countShopListByQuery,
  getShopDetailById,
  checkUserShopOwner,
  updateShop,
  purchaseService,
  deleteShop,
  calculateTotalQuantity,
};
