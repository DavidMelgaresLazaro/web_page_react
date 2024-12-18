import { useEffect, useState } from "react";
import { Img } from "../config/types";
import { getAllImg } from "../config/axios";

// Función para barajar las imágenes
const shuffleArray = (array: Img[]) => {
  return array.sort(() => Math.random() - 0.5);
};

function DivBuyNow() {
  const [products, setProducts] = useState<Img[]>([]); // Estado para guardar los productos
  const [selectedProduct, setSelectedProduct] = useState<Img | null>(null); // Estado para el producto seleccionado

  // Ejecutar la función para obtener imágenes dentro de useEffect para que solo se ejecute una vez
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getAllImg(); // Obtener todas las imágenes desde la base de datos
        const shuffled = shuffleArray(images); // Barajar las imágenes
        setProducts(shuffled.slice(0, 8)); // Actualizar el estado con las 8 imágenes más aleatorias
        setSelectedProduct(shuffled[0]); // Establecer la primera imagen aleatoria como la seleccionada
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImages(); // Llamar a la función para obtener las imágenes al montar el componente
  }, []);

  return (
    <div className="bg-indigo-600 w-full rounded-lg" style={{ height: "75vh" }}>
      <div className="flex h-full">
        {/* Lado izquierdo con el texto */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-white text-4xl font-bold mb-4">
              ¡Descubre nuevos juegos!
            </p>
            <p className="text-white text-xl">
              Compra ya y comienza la aventura.
            </p>
          </div>
        </div>

        {/* Lado derecho con la imagen */}
        <div className="w-1/2 flex items-center justify-center p-4">
          {selectedProduct ? (
            <img
              src={selectedProduct.url} // Mostrar la URL de la imagen del producto seleccionado
              alt="Juegos"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-white">Cargando imagen...</p> // Mostrar mensaje de carga mientras se obtiene la imagen
          )}
        </div>
      </div>
    </div>
  );
}

export default DivBuyNow;
