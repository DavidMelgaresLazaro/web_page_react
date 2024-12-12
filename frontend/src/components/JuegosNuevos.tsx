import { useEffect, useState } from "react";
import Product from "./product.tsx";
import { getAllImg } from "../config/axios.tsx";
import { Img } from "../config/types.ts";

// Componente que muestra imágenes de los 3 juegos más recientes obtenidos desde la base de datos.
function JuegosNuevos() {
  const [products, setProducts] = useState<Img[]>([]);

  // Ejecutar la función para obtener imágenes dentro de useEffect para que solo se ejecute una vez.
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const images = await getAllImg(); // Obtener las imágenes desde la base de datos
        const sortedById = images.sort((a, b) => {
          // Asegurarnos de que 'a.id' y 'b.id' sean números válidos
          const idA = a.id || 0; // Si 'a.id' es undefined o null, usar 0
          const idB = b.id || 0; // Lo mismo para 'b.id'
          return idB - idA; // Ordenar en orden descendente
        });
        setProducts(sortedById.slice(0, 7)); // Actualizar el estado con las 3 imágenes más recientes
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImage(); // Llamar a la función para obtener las imágenes al montar el componente.
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Juegos Nuevos</h1>
      <div className="product-list flex space-x-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default JuegosNuevos;
