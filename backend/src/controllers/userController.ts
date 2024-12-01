import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../config/db/connection";
import { users } from "../config/db/schema";
import bcrypt from "bcrypt";
import { AddUserSchema } from "../schemas/userSchema";
import HttpError from "../models/HttpError";

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

export { getAllUsers, addOneUser };
