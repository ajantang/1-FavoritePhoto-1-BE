import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "production";
const envFilePath = path.resolve(`./.env.${NODE_ENV}`).trim();

dotenv.config({ path: envFilePath });

export const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_SECURE: process.env.SESSION_SECURE
    ? JSON.parse(process.env.SESSION_SECURE.toLowerCase())
    : false,
  SESSION_SAMESITE: process.env.SESSION_SAMESITE,
  REDIS_URL: process.env.REDIS_URL,
};
