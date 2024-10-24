import express from "express";
import {
  validateExchangeAndOwner,
  validateExchangeConditions,
  validateExchangeCreator,
} from "../middlewares/validate-data.js";
import exchangeController from "../controllers/exchange-controller.js";

const exchangeRouter = express.Router();

exchangeRouter
  .post(
    "/:exchangeId/accept",
    validateExchangeAndOwner,
    validateExchangeConditions,
    exchangeController.acceptByExchange
  )
  .post(
    "/:exchangeId/refuse",
    validateExchangeAndOwner,
    exchangeController.refuseOrCancelExchange
  )
  .delete(
    "/:exchangeId",
    validateExchangeCreator,
    exchangeController.refuseOrCancelExchange
  );

export default exchangeRouter;
