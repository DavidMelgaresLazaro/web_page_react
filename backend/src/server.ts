import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import userRouter from "./routers/users.routes"; // Importa las rutas de usuarios
import HttpError from "./models/HttpError";
import { login } from "./controllers/userController";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(cookieParser());

// Usa las rutas de usuario
app.use("/users", userRouter);
app.use("/login", login);

app.use((req, res, next) => {
  next(new HttpError(404, "Invalid route"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).send({ message: error.message });
  } else {
    res.status(500).send({ message: "An unknown error occurred." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
