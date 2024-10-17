import exchangeRepository from "../repositories/exchange-repository.js";

async function checkExchangeByUser(userId, shopId) {
  const filter = {
    userId,
    shopId,
  };

  return await exchangeRepository.checkExchangeByUser(filter);
}

export default { checkExchangeByUser };
