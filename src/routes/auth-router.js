import express from "express";
import authController from "../controllers/auth-controller";
import { authMiddleware } from "../middlewares/auth";

const authRouter = express.Router();

authRouter
  .route("/")
  .post("sign-up", authController.signUp)
  .post("sign-in", authController.signIn)
  .post("sign-out", authMiddleware, authController.signOut);

export default authRouter;
