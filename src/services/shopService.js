import shopRepository from "../repositories/shopRepository.js";

async function createShop(createData) {
  return await shopRepository.createShop(createData);
}

export default {
  createShop,
};
