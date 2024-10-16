import shopRepository from "../repositories/shopRepository.js";

async function createShop(createData) {
  const { salesQuantity, ...rest } = createData;
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
