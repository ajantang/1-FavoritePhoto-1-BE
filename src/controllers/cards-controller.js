import e from "express";

function temp(req, res, next) {
  res.send();
}

const cardRouter = e.Router();

cardRouter
  .post("/:shopId/exchange", temp)
  .post("/:exchangeId/exchange-accept", temp)
  .post("/:exchangeId/exchange-refuse", temp)
  .delete("/:exchangeId/exchange-cancel", temp);

export default cardRouter;
