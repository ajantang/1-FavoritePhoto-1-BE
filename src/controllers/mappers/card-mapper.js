import { calculateTotalCountByObject } from "../../utils/number-util.js";

export function myCardMapper(ownCardSelect) {
  return {
    id: ownCardSelect.Card.id,
    image: ownCardSelect.Card.image,
    name: ownCardSelect.Card.name,
    description: ownCardSelect.Card.description,
    grade: ownCardSelect.Card.grade,
    genre: ownCardSelect.Card.genre,
    price: ownCardSelect.Card.price,
    nickname: ownCardSelect.Card.User.nickname,
    quantity: ownCardSelect.quantity,
  };
}

export function myCardListMapper({ counts, list }) {
  const totalCount = calculateTotalCountByObject(counts);
  const mappedList = list.map((item) => {
    return myCardMapper(item);
  });
  const mappedData = {
    totalCount,
    countsGroupByGrade: counts,
    cards: mappedList,
  };

  return mappedData;
}

export function myShopMapper(shopCardSelect) {
  let sellout = false;

  if (shopCardSelect.remainingQuantity === 0) {
    sellout == true;
  }

  return {
    id: shopCardSelect.Card.id,
    image: shopCardSelect.Card.image,
    name: shopCardSelect.Card.name,
    grade: shopCardSelect.Card.grade,
    genre: shopCardSelect.Card.genre,
    price: shopCardSelect.Card.price,
    nickname: shopCardSelect.Card.User.nickname,
    remainingQuantity: shopCardSelect.remainingQuantity,
    totalQuantity: shopCardSelect.totalQuantity,
    sellout,
  };
}

export function myShopListMapper({ counts, list }) {
  const totalCount = calculateTotalCountByObject(counts);
  const mappedList = list.map((item) => {
    return myShopMapper(item);
  });
  const mappedData = {
    totalCount,
    countsGroupByGrade: counts,
    shops: mappedList,
  };

  return mappedData;
}
