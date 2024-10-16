import shopRepository from "../repositories/shopRepository.js";

async function createShop(createData) {
  const { own, ...rest } = createData;
  return await shopRepository.createShop(rest);
}

export default {
  createShop,
};
