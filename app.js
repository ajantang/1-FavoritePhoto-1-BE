import cors from "cors";
import express from "express";

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

export const app = express();

app.use(cors());
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
