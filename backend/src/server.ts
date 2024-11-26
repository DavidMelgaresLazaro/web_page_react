import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { User } from "./config/types";
import HttpError from "./models/HttpError";

const app = express;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

app.use((req, res) => {
  throw new HttpError(404, "Invalid route");
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
  }
});
