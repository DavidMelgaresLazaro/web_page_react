import { Router } from "express";
import {
  getAllUsers,
  addOneUser,
  getOneUser,
  login,
} from "../controllers/userController.ts";

const userRouter = Router();

// Rutas para la gestión de usuarios
userRouter.get("/", getAllUsers); // Obtener todos los usuarios
userRouter.post("/", addOneUser); // Crear un nuevo usuario
userRouter.get("/:userId", getOneUser);

export default userRouter;
