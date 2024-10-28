import { config } from "./env.js";

export const DATABASE_URL = config.DATABASE_URL;
export const PORT = config.PORT;
export const SESSION_SECRET = config.SESSION_SECRET;
export const SESSION_SECURE = config.SESSION_SECURE;
export const SESSION_SAMESITE = config.SESSION_SAMESITE;
export const REDIS_URL = config.REDIS_URL;
export const AWS_S3_REGION = config.AWS_S3_REGION;
export const AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY;
