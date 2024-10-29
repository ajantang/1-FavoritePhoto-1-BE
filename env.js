import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "production";
const envFilePath = path.resolve(`./.env.${NODE_ENV}`).trim();

dotenv.config({ path: envFilePath, override: true });

export const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_SECURE: process.env.SESSION_SECURE === "true",
  SESSION_SAMESITE: process.env.SESSION_SAMESITE,
  REDIS_URL: process.env.REDIS_URL,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
};
