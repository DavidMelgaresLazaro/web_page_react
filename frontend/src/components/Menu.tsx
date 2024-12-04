import { NavLink } from "react-router-dom";
import user from "../config/user";

interface MenuProps {
  className?: string;
  vertical?: boolean;
}

// This is the Menu component, which dynamically generates a navigation menu with support for horizontal or vertical layouts.
// Active links are styled with specific classes, and user-specific links are conditionally rendered based on the `user` variable.

function Menu(props: MenuProps) {
  const { className, vertical } = props;

  const classes = `flex gap-4 ${className} ${
    vertical ? "flex-col items-center" : ""
  }`;

  const cookie = document.cookie;
  const existCookie = cookie !== null;

  return (
    <nav className={classes}>
      <NavLink
        className="[&.active]:bg-indigo-600  [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/about"
      >
        Sobre nostros
      </NavLink>
      <NavLink
        className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/contact"
      >
        Top 5
      </NavLink>
      <NavLink
        className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/cesta"
      >
        Cesta🛒
      </NavLink>
      {existCookie && (
        <NavLink
          className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
          to="/login"
        >
          Iniciar Sesión
        </NavLink>
      )}
      {existCookie && (
        <NavLink
          className="[&.active]:bg-indigo-600 [&.active]:text-white  [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
          to="/register"
        >
          Registro
        </NavLink>
      )}
      {!existCookie && (
        <NavLink
          className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
          to="/profile"
        >
          Profile
        </NavLink>
      )}
    </nav>
  );
}

export default Menu;
