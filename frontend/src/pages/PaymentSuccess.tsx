import { useEffect, useState } from "react";
import { instanceAxios } from "../config/axios";
import { useCart } from "../contexts/CartProvider";
import useUserContext from "../hooks/useUserContext";

function PaymentSuccess() {
  const [orderId, setOrderId] = useState<number | null>(null);
  const { cart, limpiarCarrito } = useCart();
  const { user } = useUserContext();

  const totalAmount = cart.reduce(
    (total, producto) => total + producto.price * producto.cantidad,
    0
  );

  const createOrder = async () => {
    try {
      console.log("Iniciando creación de pedido...");

      // Realiza la solicitud POST para crear el pedido
      const response = await instanceAxios.post("/orders", {
        userId: user?.id,
        products: cart,
        total: totalAmount,
      });

      console.log("Respuesta de la API:", response); // Verifica la respuesta

      if (response.data?.orderId) {
        setOrderId(response.data.orderId);
        console.log("Pedido creado con éxito, ID:", response.data.orderId);
      } else {
        console.error("No se recibió un orderId de la API");
      }

      // Limpia el carrito
      localStorage.setItem("cart", JSON.stringify([]));
      limpiarCarrito(); // Limpia el carrito
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    }
  };

  useEffect(() => {
    createOrder();
  }, []);

  return (
    <>
      <div className="container pl-24 pt-5 ">
        <h1 className="text-3xl font-bold">Pago exitoso 👏</h1>
        {orderId ? (
          <p>
            Tu compra ha sido realizada con exito. Tu número de pedido es:{" "}
            {orderId}
          </p>
        ) : (
          <p>Obteniendo número de pedido...</p>
        )}
      </div>
    </>
  );
}

export default PaymentSuccess;
