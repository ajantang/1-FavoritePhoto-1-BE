import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import adminRouter from "./src/routes/admin";
import authRouter from "./src/routes/auth";
import cardRouter from "./src/routes/cards";
import notificationRouter from "./src/routes/notification";
import pointRouter from "./src/routes/points";
import shopRouter from "./src/routes/shop";
import userRouter from "./src/routes/users";
import {
  logErrors,
  clientErrorHandler,
  serverErrorHandler,
} from "./src/middlewares/error";

import { EXPIRE_TIME } from "./src/constants/session";

dotenv.config();
export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: EXPIRE_TIME,
    },
  })
);
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/cards", cardRouter);
app.use("/notifications", notificationRouter);
app.use("/points", pointRouter);
app.use("/shop", shopRouter);
app.use("/users", userRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(serverErrorHandler);

app.listen(3000, () => console.log("Server is listening"));
