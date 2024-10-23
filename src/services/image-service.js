import { Storage } from "@google-cloud/storage";
import path from "path";

import { CustomError } from "../lib/custom-error.js";

const bucketName = "image-unload-codeit-test";
const storage = new Storage();

async function authenticateImplicitWithAdc() {
  const storage = new Storage({
    projectId: "imageupload-438323",
  });
  const [buckets] = await storage.getBuckets();
  console.log("Buckets:");

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log("Listed all storage buckets.");
}

async function UploadGoogelCloud(file) {
  if (!file) {
    return next(CustomError(40097));
  }

  authenticateImplicitWithAdc();

  const fileUrl = await new Promise((resolve, reject) => {
    const blob = storage
      .bucket(bucketName)
      .file(`${Date.now()}${path.extname(file.originalname)}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on("finish", () => {
      const url = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(url);
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.end(file.buffer);
  });

  return { url: fileUrl };
}

export default { UploadGoogelCloud };
