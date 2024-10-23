import { S3Client } from "@aws-sdk/client-s3"; // S3Client를 가져옵니다
import multer from "multer";
import { Upload } from "@aws-sdk/lib-storage"; // Upload을 가져옵니다
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// S3 클라이언트 설정
const s3Client = new S3Client({
  region: "ap-southeast-2",
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
    return res.status(400).send({ message: "No file uploaded." });
  }

  // 파일의 확장자 추출하여 체크
  const extension = path.extname(req.file.originalname);
  if (!allowedExtensions.includes(extension)) {
    return res.status(400).send({ message: "wrong extension" });
  }

  // 파일명 생성
  const fileName = `${Date.now()}_${req.file.originalname}`;

  // 업로드 설정
  const uploadParams = {
    Bucket: "favoritephoto",
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
    next();
  } catch (error) {
    next(error); // 에러 핸들러로 넘기기
  }
};

// multer의 미들웨어와 함께 사용
const multerMiddleware = upload.single("image");

export { imageUploader, multerMiddleware };
