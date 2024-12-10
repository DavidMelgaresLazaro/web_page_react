import { Router } from "express";
import express from "express";
import {
  getAllGames,
  getProducts,
  getSoldGames,
} from "../controllers/productsController";

const products_routes = express.Router();

products_routes.get("/", getAllGames);
products_routes.get("/getProducts", getProducts);
products_routes.get("/getSoldProducts", getSoldGames);

export default products_routes;
