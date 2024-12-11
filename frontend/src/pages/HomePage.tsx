import DivBuyNow from "../components/DivBuyNow";
import JuegosNuevos from "../components/JuegosNuevos";
import Carrusel from "../components/Carrusel";
import ps1 from "../images/carrousel/ps1.png";
import ps2 from "../images/carrousel/ps2.png";
import ps3 from "../images/carrousel/ps3.png";
import ps4 from "../images/carrousel/ps4.png";
import ps5 from "../images/carrousel/ps5.png";
import switch1 from "../images/carrousel/switch.png";
import wii_u from "../images/carrousel/wii_u.png";
import wii from "../images/carrousel/wii.png";
import xbox_360 from "../images/carrousel/xbox_360.png";
import xbox_one from "../images/carrousel/xbox_one.png";
import xbox_x from "../images/carrousel/xbox_x.png";
import xbox from "../images/carrousel/xbox.png";

// HomePage component that serves as the main landing page for the website.
function HomePage() {
  const imagenes = [
    ps1,
    ps2,
    ps3,
    ps4,
    ps5,
    switch1,
    wii_u,
    wii,
    xbox_360,
    xbox_one,
    xbox_x,
    xbox,
  ];

  return (
    <div className="space-y-20">
      <DivBuyNow />
      {/* Pasa las imágenes y el número de imágenes por desplazamiento */}
      <Carrusel imagenes={imagenes} itemsPorDesplazamiento={3} />
      <JuegosNuevos />
    </div>
  );
}

export default HomePage;
