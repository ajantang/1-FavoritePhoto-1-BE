import e from "express";
import { adminAuthMiddleware } from "../middlewares/admin";

const adminRouter = e.Router();
adminRouter.use(adminAuthMiddleware);

// 임시로 테스트 과정에서 데이터 수정을 용이하게 하기 위해 생성
adminRouter.get("/users", (req, res, next) => {
  // 회원 정보
});
adminRouter.patch("/users/:userId", (req, res, next) => {
  // 회원 수정
});
adminRouter.delete("/users/:userId", (req, res, next) => {
  // 회원 삭제
});
adminRouter.get("/cards", (req, res, next) => {
  // 포토 카드 정보
});
adminRouter.patch("/cards/:cardId", (req, res, next) => {
  // 포토 카드 수정
});
adminRouter.delete("/cards/:cardId", (req, res, next) => {
  // 포토 카드 삭제
});
adminRouter.get("/notification", (req, res, next) => {
  // 알림 정보
});
adminRouter.patch("/notification/:notificationId", (req, res, next) => {
  // 알림 수정
});
adminRouter.delete("/notification/:notificationId", (req, res, next) => {
  // 알림 삭제
});

export default adminRouter;
