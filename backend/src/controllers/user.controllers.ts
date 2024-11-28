import { Request, RequestHandler, Response } from "express";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcrypt";

import db from "../db/connection.js";
import { users } from "../db/schema.js";
import {
  AddUserSchema,
  IdSchema,
  LoginSchema,
} from "../schemas/userSchemas.js";
import HttpError from "../models/HttpError.js";
import ValidationError from "../models/ValidationError.js";

async function getAllUsers(req: Request, res: Response) {
  const allUsers = await db
    .select()
    .from(users)
    .where(eq(users.isDeleted, false));
  res.send(allUsers);
}

async function getOneUser(req: Request, res: Response) {
  const userId = req.params.id;
}

async function addOneUser(req: Request, res: Response) {
  const user = req.body;

  // Validamos usuario
  const { success, data: newUser, error } = AddUserSchema.safeParse(user);

  if (!success) {
    throw new ValidationError(error);
  }

  //Encriptar contraseña
  const saltNumber = 10;
  const encriptedPassword = await bcrypt.hash(newUser.password, saltNumber);

  // cambiar contraseña plana por encriptada
  newUser.password = encriptedPassword;

  const [userDB] = await db.insert(users).values(newUser).returning({
    id: users.id,
    role: users.role,
    name: users.name,
  });

  res.status(201).send(userDB);
}
