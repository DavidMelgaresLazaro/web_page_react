import DivBuyNow from "../components/DivBuyNow";
import JuegosNuevos from "../components/JuegosNuevos";


// HomePage component that serves as the main landing page for the website.

function HomePage() {
  return (
    <div className="space-y-10">
      <DivBuyNow />
      <JuegosNuevos />
    </div>
  );
}

export default HomePage;
