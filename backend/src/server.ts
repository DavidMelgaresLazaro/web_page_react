import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import userRouter from "./routers/users.routes"; // Importa las rutas de usuarios
import HttpError from "./models/HttpError";
import { login, registerUser } from "./controllers/userController";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

// Usa las rutas de usuario
app.use("/users", userRouter);

app.post("/register", registerUser);

app.post("/login", login);

app.use((req, res, next) => {
  next(new HttpError(404, "Invalid route"));
});

app.get("/users", async (req, res) => {
  const token = req.cookies.access_token;
  console.log(token);

  if (!token) {
    throw new HttpError(401, "You must send an access token");
  }
  let payload;
  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (error) {
    throw new HttpError(401, "Token invalid or expired");
  }

  console.log("😀", payload);

  const users = await sendQuery("SELECT * FROM users");

  res.send(users);
});

app.get("/users/:userId", async (req, res) => {});

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
function sendQuery(arg0: string) {
  throw new Error("Function not implemented.");
}
