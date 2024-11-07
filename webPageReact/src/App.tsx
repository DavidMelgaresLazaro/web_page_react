import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProfileBooksPage from "./pages/ProfileBooksPage";
import ProfileAccountPage from "./pages/ProfileAccountPage";
import AppRoutes from "./components/AppRoutes";


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />


      <main className="grow prose container mx-auto py-8">

        {/* {
          window.location.pathname === '/' &&  <HomePage />
        }
        {
          window.location.pathname === '/about' &&  <AboutPage />
        }
        {
          window.location.pathname === '/contact' &&  <ContactPage />
        } */}

        <AppRoutes />    

      </main>

      <Footer />
    </div>
  )
}

export default App
