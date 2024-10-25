import imageService from "../services/image-service.js";

export async function uploadImage(req, res, next) {
  try {
    let result;
    const { imageUrl } = req.body;

    if (imageUrl) {
      result = { url: imageUrl };
    } else {
      result = await imageService.UploadGoogelCloud(req.file);
    }

    return res.status(201).send(result);
  } catch (err) {
    return next(err);
  }
}

export default { uploadImage };
