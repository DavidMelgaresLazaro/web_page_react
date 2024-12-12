import React, { useState } from "react";
import { useCart } from "../contexts/CartProvider"; // Asegúrate de importar correctamente
import "../index.css"; // Aquí pondremos los estilos CSS
import { Img } from "../config/types";

interface ProductProps {
  product: Img;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Acceso al contexto del carrito
  const { agregarProducto } = useCart();

  // Manejar clic en el carrito
  const handleAddToCart = () => {
    agregarProducto(product);
    alert(`${name} se agregó al carrito`);
  };

  return (
    <div
      className={`product-card ${isHovered ? "hovered" : ""} cursor-pointer`} // Se agrega cursor-pointer para cambiar el cursor a una mano
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={product.url} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>

      {/* Ícono del carrito, se muestra solo cuando el producto es hover */}
      <div className={`cart-icon ${isHovered ? "show" : ""}`}>
        isHovered && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            🛒 Agregar al Carrito
          </button>
        </div>
        )
      </div>
    </div>
  );
};

export default Product;
