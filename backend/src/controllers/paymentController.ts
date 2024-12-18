import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QVHL5At8Uymh8lQ0DcMADutSkoH0gn0zz9vK2XUKNmWXzIsyNuXQvOB1XLOXtwAJ2RiND8vPZLk9EZvUzEKQE4X00EvpQnZTw",
  { apiVersion: "2024-11-20.acacia" }
);

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ error: "El monto debe ser mayor a 0." });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Convertir a centavos
      currency: "usd", // Moneda
      automatic_payment_methods: { enabled: true },
    });

    console.log(paymentIntent);

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
    return;
  } catch (error) {
    console.error("Error creando PaymentIntent:", error);
    res.status(500).json({ error: "Error interno al crear el PaymentIntent" });
  }
};
