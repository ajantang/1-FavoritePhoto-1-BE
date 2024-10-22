import cors from "cors";
import express from "express";
import session from "express-session";

import adminRouter from "./src/controllers/admin-controller.js";
import authRouter from "./src/routes/auth-router.js";
import cardRouter from "./src/controllers/cards-controller.js";
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

import { EXPIRE_TIME } from "./src/constants/session.js";
import exchangeRouter from "./src/routes/exchange-route.js";
import {
  SESSION_SECRET,
  SESSION_SECURE,
  SESSION_SAMESITE,
  PORT,
} from "./config.js";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(
  session({
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

app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/cards", cardRouter);
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
