import exchangeRepository from "../repositories/excahnge-repository";

async function checkExchangeByUser(userId, shopId) {
  const filter = {
    userId,
    shopId,
  };

  return await exchangeRepository.checkExchangeByUser(filter);
}

export default { checkExchangeByUser };
