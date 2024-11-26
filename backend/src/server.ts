import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import HttpError from "./models/HttpError";
import gamesRouter from "./routers/games.routes";

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

app.use("/games", gamesRouter);

app.use((req, res, next) => {
  next(new HttpError(404, "Invalid route"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).send({
      message: error.message,
    });
    return;
  }
  if (error instanceof Error) {
    res.status(500).send({
      message: error.message,
    });
  } else {
    res.status(500).send({
      message: "An unknown error occurred.",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
