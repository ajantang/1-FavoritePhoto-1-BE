import express from "express";
import authController from "../controllers/auth-controller";

const authRouter = express.Router();

authRouter
  .route("/")
  .post("sign-up", authController.signUp)
  .post("sign-in", authController.signIn)
  .post("sign-out", authController.signOut);

export default authRouter;
