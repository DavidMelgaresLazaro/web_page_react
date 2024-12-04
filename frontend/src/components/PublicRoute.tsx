import { Outlet, Navigate } from "react-router-dom";

function PublicRoute() {
  const user = JSON.parse(localStorage.getItem("user") || "null"); // Obtén al usuario desde el almacenamiento local

  if (user) return <Navigate to="/" />; // Redirige si el usuario está autenticado

  return <Outlet />; // Permite acceso si no hay un usuario autenticado
}

export default PublicRoute;
