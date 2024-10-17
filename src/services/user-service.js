import cardRepository from "../repositories/card-repository.js";
import ownRepository from "../repositories/ownRepository.js";
import shopRepository from "../repositories/shopRepository.js";
import prisma from "../repositories/prisma.js";
import {
  myCardMapper,
  myCardListMapper,
  myShopListMapper,
} from "../controllers/mappers/card-mapper.js";
import {
  createCardListFilterByQuery,
  createShopListFilterByQuery,
} from "../utils/query-util.js";

async function getMyCardList({ userId, query }) {
  const filter = createCardListFilterByQuery(query);
  const list = await ownRepository.findOwnCardList({ userId, filter });
  const counts = await ownRepository.getGroupCountByGrade({ userId, filter });

  return myCardListMapper({ counts, list });
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
    const cardInfo = await cardRepository.createCard({
      name,
      description,
      image,
      grade,
      genre,
      price,
      userId,
      quantity,
    });

    console.log("cardInfo : ", cardInfo);

    const ownCardInfo = await ownRepository.createOwn({
      cardId: cardInfo.id,
      userId,
      quantity,
    });

    return ownCardInfo;
  });
  console.log("result : ", result);
  return myCardMapper(result);
}

async function getMyShopList({ userId, query }) {
  const filter = createShopListFilterByQuery(query);
  const list = await shopRepository.findMyShopList({ userId, filter });
  const counts = await shopRepository.getGroupCountByGrade({ userId, filter });

  return myShopListMapper({ counts, list });
}

export default { getMyCardList, createMyCard, getMyShopList };
