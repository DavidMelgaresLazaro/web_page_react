import { registerOrder } from "../controllers/orderController";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/", registerOrder);

export default orderRouter;
