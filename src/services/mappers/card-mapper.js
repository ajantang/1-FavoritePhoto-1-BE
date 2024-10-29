import {
  calculateTotalCountByObject,
  calculateTotalCountByFilterObject,
} from "../../utils/number-util.js";

export function basicCardMapper(basicSelect) {
  return {
    id: basicSelect.Card.id,
    image: basicSelect.Card.image,
    name: basicSelect.Card.name,
    grade: basicSelect.Card.grade,
    genre: basicSelect.Card.genre,
    price: basicSelect.Card.price,
    nickname: basicSelect.Card.User.nickname,
  };
}

export function myCardMapper(ownCardSelect) {
  const basicSelect = basicCardMapper(ownCardSelect);

  return {
    ...basicSelect,
    description: ownCardSelect.Card.description,
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
  const basicSelect = basicCardMapper(shopCardSelect);
  let sellout = false;

  if (shopCardSelect.remainingQuantity === 0) {
    sellout == true;
  }

  const { id, ...rest } = basicSelect;

  return {
    id: shopCardSelect.id,
    ...rest,
    remainingQuantity: shopCardSelect.remainingQuantity,
    totalQuantity: shopCardSelect.totalQuantity,
    sellout,
    hasExchangeRequest: shopCardSelect.hasExchangeRequest,
  };
}

export function myShopListMapper({ counts, list }) {
  const totalCount = calculateTotalCountByFilterObject(counts);
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
