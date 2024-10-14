import e from "express";

const shopRouter = e.Router();

shopRouter
  .route("/")
  .post((req, res, next) => {
    // 내 포토 카드 판매 등록
  })
  .get(":shopId", (req, res, next) => {
    // 상품에 등록된 포토카드 조회
  })
  .put(":shopId", (req, res, next) => {
    // 상품에 등록된 포토카드 수정
  })
  .delete(":shopId", (req, res, next) => {
    // 상품에 등록된 포토카드 삭제
  })
  .post(":shopId/purchase", (req, res, next) => {
    // 포토 카드 구매
  });

export default shopRouter;
