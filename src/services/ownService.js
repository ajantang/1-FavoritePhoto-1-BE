import ownRepository from "../repositories/ownRepository.js";

async function getByFilter(filter) {
  return await ownRepository.getByFilter(filter);
}

export default { getByFilter };