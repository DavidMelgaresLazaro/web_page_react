import { NavLink } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

interface MenuProps {
  className?: string;
  vertical?: boolean;
}

function Menu(props: MenuProps) {
  const { user } = useUserContext(); // Obtenemos el estado del usuario
  const { className, vertical } = props;

  const classes = `flex gap-4 ${className} ${
    vertical ? "flex-col items-center" : ""
  }`;

  return (
    <nav className={classes}>
      <NavLink
        className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/about"
      >
        Sobre nosotros
      </NavLink>
      <NavLink
        className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/contact"
      >
        Top 5
      </NavLink>

      {!user ? (
        <>
          <NavLink
            className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
            to="/login"
          >
            Iniciar Sesión
          </NavLink>
          <NavLink
            className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
            to="/register"
          >
            Registro
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
            to="/cesta"
          >
            Cesta🛒
          </NavLink>
          <NavLink
            className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
            to="/profile"
          >
            Profile
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Menu;
