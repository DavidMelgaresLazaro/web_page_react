import { NextFunction, Request, Response } from "express";
import HttpError from "../models/HttpError";
import jwt from "jsonwebtoken";

//* Checks if the token is valid
function userAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;

  if (!token) {
    throw new HttpError(401, "You must send an access token");
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (error) {
    throw new HttpError(401, "Token invalid or expired");
  }

  next();
}

export default userAuth;
