import { FaBars } from "react-icons/fa";

import Logo from "./Logo";
import UserGreet from "./UserGreet";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

import useToggle from "../hooks/useToggle";

function Header () {
  const [isOpenSidebar, toggleSidebar] = useToggle(false);

  return (
    <header className="bg-white text-black py-1">
      <div className="container px-2 sm:px-0 mx-auto flex items-center justify-between">
        
        {/* Logo se alinea a la izquierda */}
        <Logo />
  
        {/* Esto se va a alinear a la derecha */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden sm:block">
            <Menu />
          </div>

          {/* Sidebar */}
          {isOpenSidebar && <Sidebar toggle={toggleSidebar} />}
          
          {/* Botón de menú en pantallas pequeñas */}
          <button onClick={toggleSidebar} className="sm:hidden">
            <FaBars size={30} />
          </button>

          {/* Usuario */}
          <UserGreet name="Ivan" image="https://randomuser.me/api/portraits/men/3.jpg" />
        </div>
      </div>
    </header>
  );
}

export default Header;
