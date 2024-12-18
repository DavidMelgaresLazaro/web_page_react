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
      // Realiza la solicitud POST para crear el pedido
      const response = await instanceAxios.post("/orders", {
        userId: user?.id,
        products: cart,
        total: totalAmount,
      });

      setOrderId(response.data.orderId);

      // Limpia el carrito en el almacenamiento local
      localStorage.setItem("cart", JSON.stringify([]));
      limpiarCarrito(); // Guarda un array vacío o null, si deseas borrar el carrito
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      // alert("Hubo un problema al realizar la compra. Intenta nuevamente.");
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
