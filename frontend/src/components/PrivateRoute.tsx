import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "../config/types";

//Utilizamos la carga inicial para que no se ejecute antes y pueda comprobar si el usaurio esta en localStorage
function PrivateRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar la carga inicial

  useEffect(() => {
    const savedUser = localStorage.getItem("gamexx-user");
    console.log("savedUser from localStorage:", savedUser);

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("Parsed user:", parsedUser);

        if (parsedUser && parsedUser.id && parsedUser.name) {
          setUser(parsedUser); // Usuario válido
        } else {
          console.log("User data is invalid or incomplete:", parsedUser);
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser(null);
      }
    } else {
      console.log("No user found in localStorage.");
      setUser(null);
    }

    setIsLoading(false); // Marcar que terminó la carga inicial
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Renderizar un estado de carga mientras validamos
  }

  if (user === null) {
    console.log("User is not authenticated, redirecting to login.");
    return <Navigate to="/login" />;
  }

  console.log("User is authenticated, rendering the private route.");
  return <Outlet />;
}

export default PrivateRoute;
