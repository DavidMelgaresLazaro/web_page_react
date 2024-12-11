import { NavLink } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

interface MenuProps {
  className?: string;
  vertical?: boolean;
}

function Menu(props: MenuProps) {
  const { user, logOut } = useUserContext(); // Obtenemos el estado del usuario
  const { className, vertical } = props;

  const classes = `flex gap-4 ${className} ${
    vertical ? "flex-col items-center" : ""
  }`;

  const handleLogout = () => {
    logOut();
  };

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
        to="/catalogo"
      >
        Catalogo
      </NavLink>

      <NavLink
        className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/about"
      >
        Sobre nosotros
      </NavLink>

      <NavLink
        className="[&.active]:bg-indigo-600 [&.active]:text-white [&.active]:underline [&.active]:rounded-lg [&.active]:px-2 [&.active]:py-1"
        to="/top"
      >
        Top 8
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
            className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg [&.active]:bg-indigo-600 [&.active]:underline"
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
          <button
            onClick={handleLogout}
            className="text-white bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Menu;
