import express from "express";

import imageController from "../controllers/image-controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const imageRouter = express.Router();

imageRouter.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  imageController.uploadImage
);

export default imageRouter;
