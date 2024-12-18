import express from "express";
import { createPaymentIntent } from "../controllers/paymentController";

const routerPayment = express.Router();

// Configuración de la ruta con el controlador
routerPayment.post("/payment-intent", createPaymentIntent);

export default routerPayment;
