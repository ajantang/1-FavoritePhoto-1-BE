import cardRepository from "../repositories/card-repository.js";
import ownRepository from "../repositories/ownRepository.js";
import prisma from "../repositories/prisma.js";
import {
  myCardMapper,
  myCardListMapper,
} from "../controllers/mappers/card-mapper.js";

async function getMyCardList(userId) {
  const list = await ownRepository.findOwnCardList(userId);
  const counts = await ownRepository.getGroupCountByGrade(userId);

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

    const ownCardInfo = await ownRepository.createOwn({
      cardId: cardInfo.id,
      userId,
      quantity,
    });

    return ownCardInfo;
  });

  return myCardMapper(result);
}

export default { getMyCardList, createMyCard };
