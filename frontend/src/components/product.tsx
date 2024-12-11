import React, { useState } from "react";
import "../index.css"; // Aquí pondremos los estilos CSS

interface ProductProps {
  name: string;
  price: number;
  imageUrl: string;
}

const Product: React.FC<ProductProps> = ({ name, price, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`product-card ${isHovered ? "hovered" : ""} cursor-pointer`} // Se agrega cursor-pointer para cambiar el cursor a una mano
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={name} className="product-image" />
      <div className="product-info">
        <h3>{name}</h3>
        <p>${price}</p>
      </div>

      {/* Ícono del carrito, se muestra solo cuando el producto es hover */}
      <div className={`cart-icon ${isHovered ? "show" : ""}`}>
        {isHovered && (
          <span role="img" aria-label="cart" className="cursor-pointer">
            🛒 {/* Ícono de carrito */}
          </span>
        )}
      </div>
    </div>
  );
};

export default Product;
