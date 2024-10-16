import e from "express";

const notificationRouter = e.Router();

notificationRouter
  .get("/", (req, res, next) => {
    // 알림 정보 조회 (포토카드 교환 제안/성사, 포토카드 판매 완료, 품절 등 알림)
  })
  .patch("/:notificationId", (req, res, next) => {
    // 해당 알림 수정(알림 확인 여부 수정 예정)
  })
  .delete("/:notificationId", (req, res, next) => {
    // 해당 알림 삭제
  });

export default notificationRouter;
