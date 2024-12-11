import React, { useState } from "react";

interface CarruselProps {
  imagenes: string[]; // Array de imágenes (URLs)
  itemsPorDesplazamiento: number; // Número de imágenes a desplazar por vez
}

const Carrusel: React.FC<CarruselProps> = ({
  imagenes,
  itemsPorDesplazamiento = 4,
}) => {
  const [indice, setIndice] = useState<number>(0);

  // Duplicamos las imágenes para crear el efecto infinito
  const imagenesCiclo = [...imagenes, ...imagenes];

  const cambiarImagen = (n: number) => {
    // Calcula el nuevo índice, asegurando que no se pase del rango
    const nuevoIndice =
      (indice + n * itemsPorDesplazamiento + imagenes.length) % imagenes.length;
    setIndice(nuevoIndice);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Contenedor de imágenes en una fila horizontal */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(indice / itemsPorDesplazamiento) * 100}%)`,
        }}
      >
        {imagenesCiclo.map((imagen, idx) => (
          <div key={idx} className="flex-shrink-0 w-1/4 p-2">
            {" "}
            {/* Añadido padding entre las imágenes */}
            <div className="relative w-full h-64">
              <img
                src={imagen}
                alt={`Imagen ${idx + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg" // Asegura el tamaño y añade sombra para mejorar el diseño
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botón izquierdo de navegación */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full z-10"
        onClick={() => cambiarImagen(-1)} // Desplazar a la izquierda (4 imágenes atrás)
      >
        &#10094;
      </button>

      {/* Botón derecho de navegación */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full z-10"
        onClick={() => cambiarImagen(1)} // Desplazar a la derecha (4 imágenes adelante)
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carrusel;
