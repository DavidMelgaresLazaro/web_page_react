import { Outlet, Navigate } from "react-router-dom";
import user from "../config/user";

// PrivateRoute component ensures that only authenticated users (based on the `user` variable) can access certain routes.
// If the user is authenticated, it renders the child routes using <Outlet />.
// Otherwise, it redirects unauthenticated users to the "/login" page.



function PrivateRoute() {


  if (user) return <Outlet /> 

  return <Navigate to="/login"/>

}

export default PrivateRoute