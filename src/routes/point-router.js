import express from "express";

import pointsController from "../controllers/points-controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const pointRouter = express.Router();

pointRouter
  .post("/box", authMiddleware, pointsController.openBox)
  .get("/last-box-time", authMiddleware, pointsController.getLastOpenBoxTime);

export default pointRouter;
