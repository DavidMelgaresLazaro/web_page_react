import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "../contexts/CartProvider";

const CheckoutForm = () => {
  const { limpiarCarrito } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success", // URL para la confirmación del pago
      },
    });

    // Si ocurrió un error, lo mostramos
    if (error) {
      console.error("Error durante el pago:", error);
      return;
    }

    // Si paymentIntent existe, significa que el pago fue exitoso
    console.log("Pago exitoso:");

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleCheckout}>
      <PaymentElement />
      <button
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md mt-4"
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Proceder al Pago"}
      </button>
      <button
        type="button"
        className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md mt-2"
        onClick={limpiarCarrito}
      >
        Limpiar Carrito
      </button>
    </form>
  );
};

export default CheckoutForm;
