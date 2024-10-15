import shopRepository from "../repositories/shopRepository.js";

async function createShop(creatData) {
  const { salesQuantity, ...rest } = creatData;
  const createShopData = {
    ...rest,
    remainingQuantity: salesQuantity,
    totalQuantity: salesQuantity,
  };
  return await shopRepository.createShop(createShopData);
}

export default {
  createShop,
};
