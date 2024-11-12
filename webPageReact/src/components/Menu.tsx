import { NavLink } from "react-router-dom";
import user from "../config/user";

interface MenuProps {
  className?: string;
  vertical?: boolean;
}

function Menu(props: MenuProps) {



  const { className, vertical } = props;

  const classes = `flex gap-4 ${className} ${vertical ? 'flex-col items-center' : ''}`

  return (
    <nav className={classes}>
      <NavLink className="[&.active]:bg-indigo-600  [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1" to="/">Home</NavLink>
      <NavLink className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1" to="/about">Sobre nostros</NavLink>
      <NavLink className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1" to="/contact">Top 5</NavLink>
      <NavLink className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1" to="/cesta">Cesta🛒</NavLink>
      {user && <NavLink className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1" to="/login">Iniciar Sesión</NavLink>}
      {user && <NavLink className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1" to="/register">Registro</NavLink>}
      {!user && <NavLink className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1" to="/profile">Profile</NavLink>}
      
    </nav>
  )
}

export default Menu