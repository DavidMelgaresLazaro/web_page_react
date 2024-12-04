import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "../config/types"; // Asegúrate de que la ruta es correcta

function PrivateRoute() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar si 'user' está en localStorage
    const savedUser = localStorage.getItem("user");
    console.log("savedUser from localStorage:", savedUser); // Imprime lo que tienes en localStorage

    if (savedUser) {
      try {
        // Si hay algo en localStorage, intentamos parsearlo
        const parsedUser = JSON.parse(savedUser);
        console.log("Parsed user:", parsedUser); // Imprime el objeto del usuario después de parsearlo

        // Verificamos que el usuario tenga las propiedades necesarias
        if (parsedUser && parsedUser.email && parsedUser.name) {
          setUser(parsedUser);
        } else {
          console.log("User data is invalid or incomplete.");
          setUser(null); // Si el objeto no es válido, limpiamos el estado
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser(null); // Si el parseo falla, limpiamos el estado
      }
    } else {
      console.log("No user found in localStorage.");
      setUser(null); // Si no hay datos en localStorage, limpiamos el estado
    }
  }, []);

  // Si no hay usuario, redirige al login
  if (user === null) {
    console.log("User is not authenticated, redirecting to login.");
    return <Navigate to="/login" />;
  }

  console.log("User is authenticated, rendering the private route.");
  return <Outlet />; // Si el usuario está autenticado, muestra la ruta privada
}

export default PrivateRoute;
