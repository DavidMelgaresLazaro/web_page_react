import { useEffect, useState } from "react";
import Product from "../components/product.tsx";
import { getAllImg } from "../config/axios.tsx";
import { Img } from "../config/types.ts";

//constante para barajar las imagenes
const shuffleArray = (array: Img[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Componente que muestra todas las imágenes de juegos obtenidos desde la base de datos.
function TodosLosJuegos() {
  const [products, setProducts] = useState<Img[]>([]);

  // Ejecutar la función para obtener imágenes dentro de useEffect para que solo se ejecute una vez.
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getAllImg(); // Obtener todas las imágenes desde la base de datos
        const shuffled = shuffleArray(images);
        setProducts(shuffled.slice(0, 8)); // Actualizar el estado con el top 8
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImages(); // Llamar a la función para obtener las imágenes al montar el componente.
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-center text-2xl font-bold mb-6">Top 8👑</h1>
      {/* Mostrar los productos en un contenedor de cuadrícula */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default TodosLosJuegos;
