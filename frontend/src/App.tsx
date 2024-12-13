// App.tsx
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import UserProvider from "./contexts/UserProvider";
import { CartProvider } from "./contexts/CartProvider";

const stripePromise = loadStripe(
  "pk_test_51QVHL5At8Uymh8lQPEtWAm4yaeyUKnSrgxj8IwQxSJtpLg8kYf7B5JcFA9ezT0krnsZPQf0Mik1B94FWyGNxOQU100KWSV0RaB"
);

function App() {
  const [clientSecret, setClientSecret] = useState<string | null>(null); // Almacenar el clientSecret

  useEffect(() => {
    // Llamar al backend para obtener el clientSecret
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("http://localhost:3000/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1000 }), // Suponiendo que el monto es 1000 centavos = 10 USD
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error al obtener el clientSecret", error);
      }
    };

    fetchClientSecret();
  }, []);

  // Verifica si clientSecret está disponible antes de cargar Elements
  if (!clientSecret) {
    return <div>Cargando pagina...</div>;
  }

  return (
    <UserProvider>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow mx-20 py-8">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </Elements>
    </UserProvider>
  );
}

export default App;
