import ownRepository from "../repositories/own-repository.js";

async function getByFilter(filter) {
  return await ownRepository.getByFilter(filter);
}

async function update(updateData) {
  const { totalQuantity, own } = updateData;
  const where = {
    id: own.id,
  };

  const quantity = Number(own.quantity - totalQuantity);
  const data = {
    quantity,
  };
  return await ownRepository.update(where, data);
}

export default { getByFilter, update };
