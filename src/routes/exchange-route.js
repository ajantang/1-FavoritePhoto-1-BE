import express from "express";
import { validateExchangeConditions } from "../middlewares/validateData.js";
import exchangeController from "../controllers/exchange-controller.js";

const exchangeRouter = express.Router();

exchangeRouter
  .route("/:exchangeId/accept")
  .post(validateExchangeConditions, exchangeController.acceptByExchange);

export default exchangeRouter;
