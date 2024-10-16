import express from "express";
import authController from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter
  .post("/sign-up", authController.signUp)
  .post("/sign-in", authController.signIn)
  .post("/sign-out", authMiddleware, authController.signOut);

export default authRouter;
