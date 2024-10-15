import e from "express";

const pointRouter = e.Router();

pointRouter
  .route("/")
  .post((req, res, next) => {
    // 포인트 획득
  })
  .get((req, res, next) => {
    // 포인트 획득 기록 조회
  });

export default pointRouter;
