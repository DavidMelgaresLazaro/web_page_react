import { FaBars } from "react-icons/fa";

import Logo from "./Logo";
import UserGreet from "./UserGreet";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

// import logoImage from '../assets/logo.svg';
import useToggle from "../hooks/useToggle";

function Header () {

  // const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  
  // function toggleSidebar () {
  //   setIsOpenSidebar(!isOpenSidebar);
  // }

  const [isOpenSidebar, toggleSidebar] = useToggle(false);

  return (
    <header className="bg-indigo-600 text-white py-1">
      <div className="container px-2 sm:px-0 mx-auto flex items-center gap-4">
        
        <Logo className="mr-auto" size="50" color="hotpink" />
  
        <div className="hidden sm:block">
          <Menu />
        </div>

        { isOpenSidebar && <Sidebar toggle={toggleSidebar}/>}
        <button onClick={toggleSidebar} className="sm:hidden"><FaBars size={30}/></button>


        <UserGreet name="Ivan" image="https://randomuser.me/api/portraits/men/3.jpg" />
        
      </div>
      
    </header>
  )
}
export default Header;