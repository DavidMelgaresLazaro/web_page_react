import { Request, RequestHandler, Response } from "express";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcrypt";

import db from "../config/db/connection.ts";
import { users } from "../config/db/schema.js";
import { AddUserSchema, IdSchema, LoginSchema } from "../schemas/userSchema.js";
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
  const userId = req.params.userId;

  // Verificaríamos y si no, error
  const { success, data: id, error } = IdSchema.safeParse(userId);

  if (!success) {
    throw new ValidationError(error);
  }
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.id, id), eq(users.isDeleted, false)));

  if (!user) {
    throw new HttpError(404, `User with ID ${id} not found`);
  }

  res.send(user);
}

async function addOneUser(req: Request, res: Response) {
  const user = req.body;

  // Validamos usuario
  const { success, data: newUser, error } = AddUserSchema.safeParse(user);

  if (!success) {
    throw new ValidationError(error);
  }

  // Como sabemos que ha ido bien, ahora ya podemos encriptar la contraseña
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

async function login(req: Request, res: Response) {
  const { success, data: loginUser, error } = LoginSchema.safeParse(req.body);

  if (!success) {
    throw new ValidationError(error);
  }

  // Comprobamos email en BBDD

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, loginUser.email));

  if (!user) {
    throw new HttpError(404, "Email or password incorrect");
  }

  // Ya sabemos quue el usuario existe ahora hay que comprobar que la contraseña que me pases sea correcta
  const isPasswordCorrect = await bcrypt.compare(
    loginUser.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new HttpError(404, "Email or password incorrect");
  }

  //* Por fin sabemos aquí que eres tú -- TOKEN

  // Opcion 1 para sacar cosas del objeto
  const {
    password,
    isDeleted,
    createdAt,
    updatedAt,
    deletedAt,
    email,
    ...restUser
  } = user;

  // Opcion 2, crear un objeto nuevo
  const userToSend = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  res.send(userToSend);
}

export { getAllUsers, getOneUser, addOneUser, login };
