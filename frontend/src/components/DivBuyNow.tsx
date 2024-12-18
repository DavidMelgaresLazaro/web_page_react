import { useEffect, useState } from "react";
import { Img } from "../config/types";
import { getAllImg } from "../config/axios";

const shuffleArray = (array: Img[]) => {
  return array.sort(() => Math.random() - 0.5);
};

function DivBuyNow() {
  const [selectedProduct, setSelectedProduct] = useState<Img | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getAllImg();
        const shuffled = shuffleArray(images);
        setSelectedProduct(shuffled[0]);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="bg-indigo-600 w-full rounded-lg" style={{ height: "75vh" }}>
      <div className="flex h-full">
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

        <div className="w-1/2 flex items-center justify-center p-4">
          {selectedProduct ? (
            <img
              src={selectedProduct.url}
              alt="Juegos"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-white">Cargando imagen...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DivBuyNow;
