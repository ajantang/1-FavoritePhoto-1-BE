import { S3Client } from "@aws-sdk/client-s3"; // S3Client를 가져옵니다
import multer from "multer";
import { Upload } from "@aws-sdk/lib-storage"; // Upload을 가져옵니다
import path from "path";
import dotenv from "dotenv";
import { CustomError } from "../lib/custom-error.js";

dotenv.config();

// S3 클라이언트 설정
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 파일 확장자 허용 목록
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".svg"];

const upload = multer({
  storage: multer.memoryStorage(), // 메모리 스토리지 사용
});

// 이미지 업로드 핸들러
const imageUploader = async (req, res, next) => {
  // 파일이 없을 경우 오류 처리
  if (!req.file) {
    return next(CustomError(40097));
  }

  // 파일의 확장자 추출하여 체크
  const extension = path.extname(req.file.originalname);
  if (!allowedExtensions.includes(extension)) {
    return next(CustomError(41500));
  }

  // 파일명 생성
  const fileName = `${Date.now()}_${req.file.originalname}`;

  // 업로드 설정
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, //이름 추가
    Key: fileName,
    Body: req.file.buffer, //파일의 데이터가 메모리 버퍼에 저장된 것을 나타
  };

  try {
    // AWS SDK v3의 Upload 클래스 사용
    await new Upload({
      client: s3Client,
      params: uploadParams,
    }).done();

    const imageUrl = `https://${uploadParams.Bucket}.s3.ap-southeast-2.amazonaws.com/${fileName}`;

    req.body.imageUrl = imageUrl;
    return next();
  } catch (error) {
    return next(); // 구글 클라우드로 전달
  }
};

// multer의 미들웨어와 함께 사용
const multerMiddleware = upload.single("image");

export { imageUploader, multerMiddleware };
