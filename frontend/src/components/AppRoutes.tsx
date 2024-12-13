import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import TopGamesPage from "../pages/TopGamesPage";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PaymentSuccess from "../pages/PaymentSuccess";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import CatalogoPage from "../pages/CatalogoPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Rutas generales */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/top" element={<TopGamesPage />} />
      <Route path="/catalogo" element={<CatalogoPage />} />

      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/cesta" element={<CartPage />} />
        <Route path="/verify-payment" element={<PaymentSuccess />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
