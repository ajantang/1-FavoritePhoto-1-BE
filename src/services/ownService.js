import ownRepository from "../repositories/ownRepository.js";

async function getByFilter(filter) {
  return await ownRepository.getByFilter(filter);
}

async function update(updateData) {
  const { userId, cardId, totalQuantity, currentStock } = updateData;
  const where = {
    userId,
    cardId,
  };

  const quantity = currentStock - totalQuantity;
  const data = {
    quantity,
  };
  return await ownRepository.update(where, data);
}

export default { getByFilter, update };
