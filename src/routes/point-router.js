import express from "express";

import pointController from "../controllers/point-controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const pointRouter = express.Router();

pointRouter
  .post("/box", authMiddleware, pointController.openBox)
  .get("/last-box-time", authMiddleware, pointController.getLastOpenBoxTime);

export default pointRouter;
