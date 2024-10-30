import cors from "cors";
import express from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

import authRouter from "./src/routes/auth-router.js";
import notificationRouter from "./src/routes/notification-router.js";
import shopRouter from "./src/routes/shop-router.js";
import userRouter from "./src/routes/user-router.js";
import imageRouter from "./src/routes/image-router.js";
import pointRouter from "./src/routes/point-router.js";
import {
  logErrors,
  clientErrorHandler,
  serverErrorHandler,
} from "./src/middlewares/error.js";

import { EXPIRE_TIME, REDIS_EXPIRE_TIME } from "./src/constants/session.js";
import exchangeRouter from "./src/routes/exchange-route.js";
import {
  SESSION_SECRET,
  SESSION_SECURE,
  SESSION_SAMESITE,
  PORT,
  REDIS_URL,
} from "./config.js";

export const app = express();

const redisClient = createClient({
  url: REDIS_URL,
});
redisClient.connect().then(console.log("redis connected")).catch(console.error);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dev-1-favorite-photo-1-fe.vercel.app/",
    ],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(
  session({
    store: new RedisStore({ client: redisClient, ttl: REDIS_EXPIRE_TIME }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: SESSION_SECURE,
      sameSite: SESSION_SAMESITE,
      maxAge: EXPIRE_TIME,
      partitioned: true,
    },
  })
);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/notifications", notificationRouter);
app.use("/shop", shopRouter);
app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/points", pointRouter);
app.use("/exchange", exchangeRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(serverErrorHandler);

app.listen(PORT, () => console.log(`Server is listening port : ${PORT}`));
