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
