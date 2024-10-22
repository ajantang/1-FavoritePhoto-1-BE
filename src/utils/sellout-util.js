export async function exchangeDelete(shopDetailData) {

  const exchangesCardInfo = shopDetailData.Exchanges;
  const exchangeDeleteData = await Promise.all(
    exchangesCardInfo.map(async (exchangeInfo) => {
      const userId = exchangeInfo.userId;
      const cardId = exchangeInfo.Card.id;

      const own = await ownRepository.findFirstData({
        where: {
          userId,
          cardId,
        },
      });

      if (own === null || own === undefined) {
        const createData = {
          userId,
          cardId,
          quantity: 1,
        };
        const result = await ownRepository.createData({ data: createData });
      } else {
        const updateWhere = {
          userId_cardId: {
            userId,
            cardId,
          },
        };
        const updateData = {
          quantity: {
            increment: 1,
          },
        };
        const result = await ownRepository.updateData({
          where: updateWhere,
          data: updateData,
        });
      }
    })
  );
  await exchangeRepository.deleteManyData({
    shopId: shopDetailData.id,
  });
}
