import express from "express";

import notificationController from "../controllers/notification-controller.js";
import {
  authMiddleware,
  authMiddlewareByNotificationIdParam,
} from "../middlewares/auth.js";

const notificationRouter = express.Router();

notificationRouter
  .patch(
    "/:notificationId",
    authMiddleware,
    authMiddlewareByNotificationIdParam,
    notificationController.checkNotification
  )
  .delete(
    "/:notificationId",
    authMiddleware,
    authMiddlewareByNotificationIdParam,
    notificationController.deleteNotification
  );

export default notificationRouter;
