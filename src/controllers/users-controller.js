import e from "express";

const userRouter = e.Router();

userRouter
  .get("/cards", (req, res, next) => {
    // 구매? 보유?한 내 포토 카드 목록 조회
  })
  .post("/cards", (req, res, next) => {
    // 내 포토 카드 등록
  })
  .get("/cards/sale", (req, res, next) => {
    // 내가 판매 등록한 포토 카드 목록 조회
  })
  .get("/cards/exchange", (req, res, next) => {
    // 내가 교환 신청한 포토 카드 목록 조회
  })
  .get("/profile", (req, res, next) => {
    // 내 프로필 조회
  })
  .get("/check-email", (req, res, next) => {
    // 이메일 중복 확인 (리턴 방식/데이터 죠율 필요)
  })
  .get("/check-nickname", (req, res, next) => {
    // 닉네임 중복 확인 (리턴 방식/데이터 죠율 필요)
  });

export default userRouter;
