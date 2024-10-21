import ownController from "../controllers/own.js";
import { EXCHANGE_VOLUME } from "../constants/exchange.js";

export async function validateExchange(req, res, next) {
  const { userId } = req.session.userId;
  const { cardId } = req.body;
  const isPossible = ownController.isValidateQuantity({
    userId,
    cardId,
    quantity: EXCHANGE_VOLUME,
  });

  if (!isPossible) {
    next();
  }
}
