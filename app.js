import cors from "cors";
import express from "express";

import adminRouter from "./src/controllers/admin-controller.js";
import authRouter from "./src/controllers/auth-controller.js";
import cardRouter from "./src/controllers/cards-controller.js";
import notificationRouter from "./src/controllers/notification-controller.js";
import pointRouter from "./src/controllers/points-controller.js";
import shopRouter from "./src/controllers/shop-controller.js";
import userRouter from "./src/controllers/users-controller.js";
import {
  logErrors,
  clientErrorHandler,
  serverErrorHandler,
} from "./src/middlewares/error.js";

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
