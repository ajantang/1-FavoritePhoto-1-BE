import ownRepository from "../repositories/ownRepository";

async function getByFilter(filter) {
  return await ownRepository.getByFilter(filter);
}

export default { getByFilter };