import { useCart } from "../contexts/CartProvider";

const CartPage = () => {
  const {
    cart,
    cantidadTotal,
    eliminarProducto,
    actualizarCantidad,
    limpiarCarrito,
  } = useCart();

  // Calcular el subtotal dinámicamente
  const calcularTotal = () =>
    cart.reduce(
      (total, producto) => total + producto.price * producto.cantidad,
      0
    );

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 px-4 lg:px-16 py-8">
      {/* Lista de productos */}
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
              {/* Imagen del producto */}
              <img
                src={producto.url}
                alt={producto.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              {/* Detalles del producto */}
              <div className="flex-grow ml-4">
                <h2 className="text-lg font-semibold">{producto.name}</h2>
                <p className="text-gray-600">
                  Precio: $
                  {producto.price && !isNaN(producto.price)
                    ? producto.price.toFixed(2)
                    : "0.00"}
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
                    onChange={(e) =>
                      actualizarCantidad(
                        producto.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </div>
              </div>
              {/* Botón de eliminar */}
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

      {/* Resumen del pedido */}
      {cart.length > 0 && (
        <div className="w-full lg:w-1/3 bg-white shadow-md p-6 rounded-md mt-6 lg:mt-0">
          <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
          <div className="flex justify-between text-gray-700">
            <span>Total de productos:</span>
            <span>{cantidadTotal}</span>
          </div>
          <div className="flex justify-between text-gray-700 my-2">
            <span>Subtotal:</span>
            <span>${calcularTotal().toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md mt-4"
            onClick={() => alert("Procediendo al pago...")}
          >
            Proceder al Pago
          </button>
          <button
            className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md mt-2"
            onClick={limpiarCarrito}
          >
            Limpiar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
