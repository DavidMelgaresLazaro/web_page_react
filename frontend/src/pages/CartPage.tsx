import { useState, useEffect, useCallback } from "react";
import { useCart } from "../contexts/CartProvider";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Cargar la clave pública de Stripe
const stripePromise = loadStripe(
  "pk_test_51QVHL5At8Uymh8lQPEtWAm4yaeyUKnSrgxj8IwQxSJtpLg8kYf7B5JcFA9ezT0krnsZPQf0Mik1B94FWyGNxOQU100KWSV0RaB"
);

const CartPage = () => {
  const { cart, cantidadTotal, eliminarProducto, actualizarCantidad } =
    useCart();

  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  // Calcular el total del carrito
  const calcularTotal = useCallback(
    () =>
      cart.reduce(
        (total, producto) => total + producto.price * producto.cantidad,
        0
      ),
    [cart]
  );

  useEffect(() => {
    setTotal(calcularTotal());
  }, [cart, calcularTotal]);

  useEffect(() => {
    // Obtener el clientSecret desde el backend
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "https://web-page-react.onrender.com/payments/payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total * 100 }), // Enviar el total convertido a centavos
          }
        );
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error al obtener el clientSecret", error);
      }
    };

    if (total > 0) {
      fetchClientSecret();
    }
  }, [total]);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 px-4 lg:px-16 py-8">
      <div className="flex-grow bg-white shadow-md p-6 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          cart.map((producto) => (
            <div
              key={producto.id}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <img
                src={producto.url}
                alt={producto.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-grow ml-4">
                <h2 className="text-lg font-semibold">{producto.name}</h2>
                <p className="text-gray-600">
                  Precio: ${producto.price.toFixed(2)}
                </p>
                <p className="text-gray-800 font-bold">
                  Subtotal: ${(producto.price * producto.cantidad).toFixed(2)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <label className="text-gray-500">Cantidad:</label>
                  <input
                    type="number"
                    value={producto.cantidad}
                    min="1"
                    className="w-16 border border-gray-300 rounded-md px-2 py-1"
                    onChange={(e) => {
                      const cantidad = parseInt(e.target.value, 10);
                      if (isNaN(cantidad) || cantidad <= 0) {
                        alert("Ingrese una cantidad válida.");
                        return;
                      }
                      actualizarCantidad(producto.id, cantidad);
                    }}
                  />
                </div>
              </div>
              <button
                className="text-red-600 hover:underline"
                onClick={() => eliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="w-full lg:w-1/3 bg-white shadow-md p-6 rounded-md mt-6 lg:mt-0">
          <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
          <div className="flex justify-between text-gray-700">
            <span>Total de productos:</span>
            <span>{cantidadTotal}</span>
          </div>
          <div className="flex justify-between text-gray-700 my-2">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="mt-4">
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            ) : (
              <p className="text-gray-500">Cargando opciones de pago...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
