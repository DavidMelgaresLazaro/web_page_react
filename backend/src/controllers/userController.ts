import { Request, Response } from "express";
import { eq, and } from "drizzle-orm";
import { db } from "../config/db/connection";
import { users } from "../config/db/schema";
import bcrypt from "bcrypt";
import { AddUserSchema, LoginSchema, IdSchema } from "../schemas/userSchema";
import HttpError from "../models/HttpError";
import { z } from "zod";
import ValidationError from "../models/ValidationError";

async function getAllUsers(req: Request, res: Response) {
  try {
    const allUsers = await db
      .select()
      .from(users)
      .where(eq(users.isDeleted, false));

    res.status(200).send(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Error fetching users" });
  }
}

async function addOneUser(req: Request, res: Response) {
  const user = req.body;

  const { success, data: newUser, error } = AddUserSchema.safeParse(user);
  if (!success) {
    return res
      .status(400)
      .send({ message: "Validation error", errors: error.errors });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

    const userToInsert = { ...newUser, password: hashedPassword };

    const [createdUser] = await db
      .insert(users)
      .values(userToInsert)
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      });

    res.status(201).send(createdUser);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send({ message: "Error saving user to the database" });
  }
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
async function login(req: Request, res: Response) {
  const { success, data: loginUser, error } = LoginSchema.safeParse(req.body);

  if (!success) {
    throw new ValidationError(error);
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, loginUser.email));

  if (!user) {
    throw new HttpError(404, "Email or password incorrect");
  }

  const isPasswordCorrect = await bcrypt.compare(
    loginUser.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new HttpError(404, "Email or password incorrect");
  }

  //* Por fin sabemos aquí que eres tú -- TOKEN

  const userToSend = {
    id: user.id,
    name: user.name,
  };

  res.send(userToSend);
}

export { getAllUsers, addOneUser, getOneUser, login };
