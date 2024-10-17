import imageService from "../services/image-service.js";

export async function uploadImage(req, res, next) {
  try {
    const result = await imageService.UploadGoogelCloud(req.file);

    return res.status(201).send(result);
  } catch (err) {
    return next(err);
  }
}

export default { uploadImage };
