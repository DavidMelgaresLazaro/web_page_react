import { Outlet, Navigate } from "react-router-dom";
import user from "../config/user";

// PublicRoute component restricts access to certain routes for authenticated users.
// If the user is logged in (`user` exists), it renders the child routes using <Outlet />.
// If the user is not authenticated, it redirects them to the home page ("/").


function PublicRoute() {


  if (user) return <Outlet /> 

  return <Navigate to="/"/>

}

export default PublicRoute