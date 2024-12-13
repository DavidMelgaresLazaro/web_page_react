import { Request, Response } from "express";
import Stripe from "stripe";

// Configura Stripe con tu clave secreta
const stripe = new Stripe(
  "sk_test_51QVHL5At8Uymh8lQ0DcMADutSkoH0gn0zz9vK2XUKNmWXzIsyNuXQvOB1XLOXtwAJ2RiND8vPZLk9EZvUzEKQE4X00EvpQnZTw"
);

export const verifyPaymentIntent = async (req: Request, res: Response) => {
  const { paymentIntentId, paymentIntentClientSecret, redirectStatus } =
    req.body;

  if (!paymentIntentId || !paymentIntentClientSecret || !redirectStatus) {
    return res
      .status(400)
      .json({
        error:
          "paymentIntentId, paymentIntentClientSecret, y redirectStatus son necesarios",
      });
  }

  try {
    // Verifica el estado del PaymentIntent usando el paymentIntentId
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Verifica si el pago fue exitoso
    if (paymentIntent.status === "succeeded") {
      return res.json({
        success: true,
        message: "Pago procesado exitosamente",
      });
    } else {
      return res.json({ success: false, message: "Pago no completado." });
    }
  } catch (error) {
    console.error("Error verificando el pago:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
