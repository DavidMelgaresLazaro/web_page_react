import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CestaPage from "../pages/CestaPage";
import ProfilePage from "../pages/ProfilePage";
import ProfileBooksPage from "../pages/ProfileBooksPage";
import ProfileAccountPage from "../pages/ProfileAccountPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";



export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />}/>
      <Route path="/about" element={<AboutPage />}/>
      <Route path="/contact" element={<ContactPage />}/>
      <Route path="/cesta" element={<CestaPage />}/>

      //* Rutas públicas
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />}/>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/register" element={<RegisterPage />}/>
      </Route>
      //*================

      //! Rutas privadas
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />}>
          
          <Route path="books" element={<ProfileBooksPage />}/>
          <Route path="account" element={<ProfileAccountPage />}/>
        
        </Route>
      </Route>
      //!================

    </Routes> 
  )
}
