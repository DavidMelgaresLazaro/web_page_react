import React, { createContext, useState, useContext, ReactNode } from "react";
import { Img, ProductoInCart } from "../config/types";

// Tipado del contexto
type CartContextType = {
  cart: ProductoInCart[];
  cantidadTotal: number;
  agregarProducto: (producto: Img) => void;
  eliminarProducto: (id: number) => void;
  limpiarCarrito: () => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
};

// Crear el contexto
const CartContext = createContext<CartContextType | null>(null);

const LOCAL_STORAGE_CART_KEY = "cart";

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ProductoInCart[]>(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Calcular la cantidad total de productos en el carrito
  const cantidadTotal = cart.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // Guardar el carrito en localStorage
  const saveCartToLocalStorage = (updatedCart: ProductoInCart[]) => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedCart));
  };

  // Agregar producto al carrito
  const agregarProducto = (producto: Img) => {
    if (!producto.id || isNaN(producto.id)) {
      console.warn("Producto con ID no válido:", producto);
      return;
    }

    setCart((prevCart) => {
      const existeProducto = prevCart.find((p) => p.id === producto.id);
      let updatedCart;
      if (existeProducto) {
        updatedCart = prevCart.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        updatedCart = [...prevCart, { ...producto, cantidad: 1 }];
      }
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Eliminar producto del carrito
  const eliminarProducto = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((producto) => producto.id !== id);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Actualizar la cantidad de un producto
  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad < 1) return; // Evitar cantidades menores a 1

    setCart((prevCart) => {
      const updatedCart = prevCart.map((producto) =>
        producto.id === id ? { ...producto, cantidad } : producto
      );
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Limpiar el carrito
  const limpiarCarrito = () => {
    setCart([]);
    localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cantidadTotal,
        agregarProducto,
        eliminarProducto,
        limpiarCarrito,
        actualizarCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
