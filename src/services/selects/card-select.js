export const cardSelect = {
  id: true,
  name: true,
  price: true,
  grade: true,
  genre: true,
  image: true,
  User: {
    select: {
      nickname: true,
    },
  },
  createdAt: true,
};

export const cardDetailSelect = {
  ...cardSelect,
  description: true,
};

export const cardDetailRequsterSelect = (requesterId) => ({
  ...cardDetailSelect,
  Exchanges: {
    where: { userId: requesterId },
    selects: {
      id: true,
      description: true,
      Card: cardSelect,
      createdAt: true,
    },
  },
});

export const cardDetailPurchaserSelect = {
  ...cardDetailSelect,
  Exchanges: {
    select: {
      id: true,
      description: true,
      Card: cardSelect,
      createdAt: true,
    },
  },
};
