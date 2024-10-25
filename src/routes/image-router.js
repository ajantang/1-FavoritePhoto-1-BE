import express from "express";

import imageController from "../controllers/image-controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  imageUploader,
  multerMiddleware,
} from "../middlewares/image-uploader.js";

const imageRouter = express.Router();

imageRouter.post(
  "/upload",
  authMiddleware,
  multerMiddleware,
  imageUploader,
  imageController.uploadImage
);

export default imageRouter;
