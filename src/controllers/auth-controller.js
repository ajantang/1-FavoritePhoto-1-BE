import e from "express";
import { authMiddleware } from "../middlewares/auth";

const authRouter = e.Router();
authRouter.use(authMiddleware);

authRouter
  .route("/")
  .post("sign-up", (req, res, next) => {
    // 회원 가입
  })
  .post("sign-in", (req, res, next) => {
    // 로그인
  })
  .post("sign-out", (req, res, next) => {
    // 로그 아웃
  })
  .post("refresh", (req, res, next) => {
    // 토큰 갱신
  });

export default authRouter;
