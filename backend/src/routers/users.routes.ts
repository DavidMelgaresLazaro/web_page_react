import { Router } from "express";
import {
  getAllUsers,
  registerUser,
  getOneUser,
  login,
} from "../controllers/userController.ts";

const userRouter = Router();

//* Define routes for user management

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getOneUser);

export default userRouter;
