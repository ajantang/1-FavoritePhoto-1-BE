import ownRepository from "../repositories/ownRepository.js";

async function getByFilter(filter) {
  return await ownRepository.getByFilter(filter);
}

async function update(updateData) {
  const { totalQuantity, own } = updateData;
  const where = {
    id: own.id,
  };

  const quantity = own.quantity - totalQuantity;
  const data = {
    quantity,
  };
  return await ownRepository.update(where, data);
}

export default { getByFilter, update };
