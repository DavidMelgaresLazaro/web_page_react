import { Outlet, Navigate } from "react-router-dom";
import user from "../config/user";

function PublicRoute() {


  if (!user) return <Outlet /> 

  return <Navigate to="/"/>

}

export default PublicRoute