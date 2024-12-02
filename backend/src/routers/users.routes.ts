import { Router } from "express";
import {
  getAllUsers,
  addOneUser,
  getOneUser,
  login,
} from "../controllers/userController.ts";

const userRouter = Router();

//* Define routes for user management

userRouter.get("/", getAllUsers);
userRouter.post("/", addOneUser);
userRouter.get("/:userId", getOneUser);

export default userRouter;
