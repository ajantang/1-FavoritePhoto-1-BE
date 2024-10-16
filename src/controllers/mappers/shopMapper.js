export function createShopMapper(data) {
  const seller = data.User;
  const card = data.Card;
  const creator = card.User;

  return {
    salesInfo: {
      id: data.id,
      image: card.image,
      name: card.anme,
      grade: card.grade,
      genre: card.genre,
      creatorNickname: creator.nickname,
      sellerNickname: seller.nickname,
      description: card.description,
      price: data.price,
      remainingQuantity: data.remainingQuantity,
      totalQuantity: data.totalQuantity,
    },
    exchangePreference: {
      description: data.exchangeDescription,
      grade: data.exchangeGrade,
      genre: data.exchangeGenre,
    },
  };
}

