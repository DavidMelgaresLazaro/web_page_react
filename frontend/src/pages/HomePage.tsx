import DivBuyNow from "../components/DivBuyNow";
import JuegosNuevos from "../components/JuegosNuevos";
import Carrusel from "../components/Carrusel"; // Asegúrate de que la importación sea correcta
import BO6_image from "../images/BO6_image.jpg"; // Asegúrate de que la ruta sea correcta
import { useEffect, useState } from "react";
import { Img } from "../config/types";
import { getAllImg } from "../config/axios";

// HomePage component that serves as the main landing page for the website.
function HomePage() {
  // Array de imágenes. Puedes agregar tantas imágenes como desees.
  const imagenes = [
    BO6_image, // Imagen 1
    BO6_image, // Imagen 2
    BO6_image, // Imagen 3
    BO6_image, // Imagen 4
    BO6_image, // Imagen 5
    BO6_image, // Imagen 6
    BO6_image, // Imagen 7
    BO6_image, // Imagen 8
    BO6_image, // Imagen 9
  ];

  const [products, setProducts] = useState<Img[]>([]);

  // Ejecutar la función de obtener imágenes dentro de useEffect para que solo se ejecute una vez.
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const images = await getAllImg();
        setProducts(images); // Actualizar el estado con todas las imágenes
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImage(); // Llamar a la función para obtener las imágenes al montar el componente.
  }, []);

  return (
    <div className="space-y-20">
      <DivBuyNow />
      {/* Pasa las imágenes y el número de imágenes por desplazamiento */}
      <Carrusel
        imagenes={products.map((product) => product.url)}
        itemsPorDesplazamiento={4}
      />
      <JuegosNuevos />
    </div>
  );
}

export default HomePage;
