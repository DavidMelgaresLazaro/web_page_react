import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import UserProvider from "./contexts/UserProvider";
import { CartProvider } from "./contexts/CartProvider";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow mx-20 py-8">
            <AppRoutes />
          </main>

          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
