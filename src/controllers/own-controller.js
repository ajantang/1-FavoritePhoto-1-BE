import ownRepository from "../repositories/own-repository.js";
import { ownSelect } from "../services/selects/own-select";

async function isValidateQuantity({ userId, cardId, quantity }) {
  const where = { userId, cardId };
  const own = await ownRepository.findFirstData({ where, select: ownSelect });

  if (own.quantity >= quantity) {
    return true;
  }

  return false;
}

export default { isValidateQuantity };
