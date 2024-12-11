import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/TopGamesPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProfileBooksPage from "./pages/ProfileBooksPage";
import ProfileAccountPage from "./pages/ProfileAccountPage";
import AppRoutes from "./components/AppRoutes";
import UserProvider from "./contexts/UserProvider";

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow mx-20 py-8">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
