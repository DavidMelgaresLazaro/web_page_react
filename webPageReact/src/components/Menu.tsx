import { Link, NavLink } from "react-router-dom";
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
      <NavLink className="[&.active]:text-purple [&.active]:underline" to="/">Home</NavLink>
      <NavLink className="[&.active]:text-yellow-400 [&.active]:underline" to="/about">About</NavLink>
      <NavLink className="[&.active]:text-yellow-400 [&.active]:underline" to="/contact">Contact</NavLink>
      {user && <NavLink className="[&.active]:text-yellow-400 [&.active]:underline" to="/login">Log In</NavLink>}
      {!user && <NavLink className="[&.active]:text-yellow-400 [&.active]:underline" to="/profile">Profile</NavLink>}
      
    </nav>
  )
}

export default Menu