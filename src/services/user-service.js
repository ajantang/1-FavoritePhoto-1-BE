import cardRepository from "../repositories/card-repository.js";
import ownRepository from "../repositories/own-repository.js";
import shopRepository from "../repositories/shop-repository.js";
import exchangeRepository from "../repositories/exchange-repository.js";
import prisma from "../repositories/prisma.js";
import {
  myCardMapper,
  myCardListMapper,
  myShopListMapper,
} from "./mappers/card-mapper.js";
import { myExchangeListMapper } from "./mappers/exchange-mapper.js";
import {
  createCardListFilterByQuery,
  createOrderBy,
  createShopListFilterByQuery,
  createGenreGradeKeywordWhere,
} from "../utils/query-util.js";
import userRepository from "../repositories/user-repository.js";
import { userSelect } from "./selects/user-select.js";
import { exchangeCardShopSelect } from "./selects/exchange-select.js";
import { ownCardSelect, ownGradeSelect } from "./selects/own-select.js";
import { cardDetailSelect } from "./selects/card-select.js";
import { shopListSelect, shopGradeSelect } from "./selects/shop-select.js";

import { EXCHANGE_VOLUME } from "../constants/exchange.js";

async function getMyCardList({ userId, query }) {
  const filter = createCardListFilterByQuery(query);
  const where = { userId, ...filter.where };
  const list = await ownRepository.findManyByPaginationData({
    orderBy: filter.orderBy,
    skip: filter.skip,
    take: filter.take,
    where,
    select: ownCardSelect,
  });

  const ownGradeList = await ownRepository.findManyData({
    where,
    select: ownGradeSelect,
  });
  const counts = ownGradeList.reduce((acc, own) => {
    const grade = own.Card.grade;

    if (!acc[grade]) {
      acc[grade] = 0;
    }

    acc[grade] += own.quantity;

    return acc;
  }, {});

  return myCardListMapper({ counts, list });
}

async function getMyCard({ userId, cardId }) {
  const where = { userId, cardId };
  const result = await ownRepository.findFirstData({
    where,
    select: ownCardSelect,
  });

  return myCardMapper(result);
}

async function createMyCard({
  name,
  description,
  image,
  grade,
  genre,
  price,
  userId,
  quantity,
}) {
  const result = await prisma.$transaction(async () => {
    const newCardData = {
      name,
      description,
      image,
      grade,
      genre,
      price,
      userId,
      totalQuantity: quantity,
    };
    const cardInfo = await cardRepository.createData({
      data: newCardData,
      select: cardDetailSelect,
    });
    const newOwnData = { userId, cardId: cardInfo.id, quantity };
    const ownCardInfo = await ownRepository.createData({
      data: newOwnData,
      select: ownCardSelect,
    });

    return ownCardInfo;
  });

  return myCardMapper(result);
}

async function getMyShopList({ userId, query }) {
  const filter = createShopListFilterByQuery(query);
  const where = { userId, ...filter.where };
  const list = await shopRepository.findManyByPaginationData({
    orderBy: filter.orderBy,
    skip: filter.skip,
    take: filter.take,
    where,
    select: shopListSelect,
  });

  const shopGradeList = await shopRepository.findManyData({
    where,
    select: shopGradeSelect,
  });
  const counts = shopGradeList.reduce((acc, shop) => {
    const grade = shop.Card.grade;

    if (!acc[grade]) {
      acc[grade] = 0;
    }

    acc[grade] += shop.remainingQuantity;

    return acc;
  }, {});

  return myShopListMapper({ counts, list });
}

async function getMyExchangeList({ userId, query }) {
  const { sort, genre, grade, pageNum, pageSize, keyword = "" } = query;
  const orderBy = createOrderBy(sort);
  const page = pageNum || 1;
  const pageSizeNum = pageSize || 15;
  const offset = (page - 1) * pageSizeNum;
  const skip = parseInt(offset);
  const take = parseInt(pageSizeNum);
  const genreGradeKwywordWhere = createGenreGradeKeywordWhere({
    genre,
    grade,
    keyword,
  });
  const where = { userId, ...genreGradeKwywordWhere };
  const list = await exchangeRepository.findManyByPaginationData({
    orderBy,
    skip,
    take,
    where,
    select: exchangeCardShopSelect,
  });
  const ownGradeList = await exchangeRepository.findManyData({
    where,
    select: {
      Card: {
        select: {
          grade: true,
        },
      },
    },
  });
  const counts = ownGradeList.reduce((acc, own) => {
    const grade = own.Card.grade;

    if (!acc[grade]) {
      acc[grade] = 0;
    }

    acc[grade] += EXCHANGE_VOLUME;

    return acc;
  }, {});

  return myExchangeListMapper({ counts, list });
}

async function getUserInfoById(id) {
  const where = { id };

  return await userRepository.findFirstData({ where, select: userSelect });
}

export default {
  getMyCardList,
  getMyCard,
  createMyCard,
  getMyShopList,
  getMyExchangeList,
  getUserInfoById,
};
