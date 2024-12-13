// routes/payment.routes.ts
import express, { Request, Response } from "express";
import Stripe from "stripe";

// Crea una instancia de Stripe con tu clave secreta de prueba
const stripe = new Stripe("sk_test_yourSecretKey", {});

const router = express.Router();

// Ruta para crear el PaymentIntent
router.post("/verify-payment", async (req: Request, res: Response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // El monto en centavos
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { integration_check: "accept_a_payment" },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creando el paymentIntent:", error);
    res.status(500).json({ error: "Error al crear el paymentIntent" });
  }
});

export default router;
