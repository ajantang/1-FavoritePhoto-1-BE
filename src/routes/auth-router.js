import express from "express";
import authController from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  validateSignUpUserData,
  validateSignInUserData,
} from "../middlewares/validate-data.js";

const authRouter = express.Router();

authRouter
  .post("/sign-up", validateSignUpUserData, authController.signUp)
  .post("/sign-in", validateSignInUserData, authController.signIn)
  .post("/sign-out", authMiddleware, authController.signOut);

export default authRouter;
