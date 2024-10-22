import express from "express";

import notificationController from "../controllers/notification-controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const notificationRouter = express.Router();

notificationRouter
  .patch(
    "/:notificationId",
    authMiddleware,
    notificationController.checkNotification
  )
  .delete(
    "/:notificationId",
    authMiddleware,
    notificationController.deleteNotification
  );

export default notificationRouter;
