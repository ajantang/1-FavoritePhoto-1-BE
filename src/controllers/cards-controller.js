import e from "express";

const cardRouter = e.Router();

cardRouter
  .route("/")
  .post(":shopId/exchange", (req, res, next) => {
    // 포토 카드 교환 제안
  })
  .post(":exchangeId/exchange-accept", (req, res, next) => {
    // 포토 카드 교환 제안 승인
  })
  .post(":exchangeId/exchange-refuse", (req, res, next) => {
    // 포토 카드 교환 제안 거절
  })
  .delete(":exchangeId/exchange-cancel", (req, res, next) => {
    // 포토 카드 교환 제안 취소
  });

export default cardRouter;
