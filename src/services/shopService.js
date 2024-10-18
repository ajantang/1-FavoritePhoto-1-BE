import prisma from "../repositories/prisma.js";
import shopRepository from "../repositories/shopRepository.js";
import ownRepository from "../repositories/ownRepository.js";

import { myCardMapper } from "../controllers/mappers/card-mapper.js";

async function createShop(createData) {
  const { own, ...rest } = createData;
  return await shopRepository.createShop(rest);
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

export default {
  createShop,
  getShopListByQuery,
  countShopListByQuery,
  getShopDetailById,
  checkUserShopOwner,
  updateShop,
  deleteShop,
};
