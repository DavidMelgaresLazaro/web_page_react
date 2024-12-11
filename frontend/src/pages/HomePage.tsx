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

  return (
    <div className="space-y-20">
      <DivBuyNow />
      {/* Pasa las imágenes y el número de imágenes por desplazamiento */}
      <Carrusel imagenes={imagenes} itemsPorDesplazamiento={4} />
      <JuegosNuevos />
    </div>
  );
}

export default HomePage;
