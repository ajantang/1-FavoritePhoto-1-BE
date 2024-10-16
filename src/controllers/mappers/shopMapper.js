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

export function getShopListMapper(list, total) {
  const shops = list.map((shop) => {
    const card = shop.Card;
    const creator = card.User;
    let sellout;

    if (shop.remainingQuantity === 0) {
      sellout == true;
    } else {
      sellout = false;
    }

    return {
      id: shop.id,
      cardId: card.id,
      sellout,
      image: card.image,
      name: card.name,
      grade: card.grade,
      genre: card.genre,
      creatorNickname: creator.nickname,
      price: shop.price,
      remainingQuantity: shop.remainingQuantity,
      totalQuantity: shop.totalQuantity,
    };
  });

  return {
    total,
    shops,
  };
}
