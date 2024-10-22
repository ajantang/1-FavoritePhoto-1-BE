import express from "express";
import {
  validateExchangeAndOwner,
  validateExchangeConditions,
  validateExchangeCreator,
} from "../middlewares/validateData.js";
import exchangeController from "../controllers/exchange-controller.js";

const exchangeRouter = express.Router();

exchangeRouter
  .route("/:exchangeId/accept")
  .post(
    validateExchangeAndOwner,
    validateExchangeConditions,
    exchangeController.acceptByExchange
  );

exchangeRouter
  .route("/:exchangeId/refuse")
  .post(validateExchangeAndOwner, exchangeController.refuseOrCancelExchange);

exchangeRouter
  .route("/:exchangeId")
  .delete(validateExchangeCreator, exchangeController.refuseOrCancelExchange);

export default exchangeRouter;
