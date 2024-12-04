import { FaBars } from "react-icons/fa";

import Logo from "./Logo";
import UserGreet from "./UserGreet";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

import useToggle from "../hooks/useToggle";

// Header with the logo on the left side, and a menu on the right. On mobile, the menu transforms into a hamburger icon that opens a sidebar.
//local storage
function Header() {
  const [isOpenSidebar, toggleSidebar] = useToggle(false);

  return (
    <header className="bg-white text-black py-1 ">
      <div className="container px-4 text-xl sm:px-0 mx-auto flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden sm:block">
            <Menu />
          </div>

          {isOpenSidebar && <Sidebar toggle={toggleSidebar} />}

          <button onClick={toggleSidebar} className="sm:hidden">
            <FaBars size={30} />
          </button>

          {cookie !== null && (
            <UserGreet
              name={cookie}
              image="https://randomuser.me/api/portraits/men/8.jpg"
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
