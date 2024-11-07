import { IoClose } from "react-icons/io5";

import Menu from "./Menu"

type SidebarProps = {
  toggle: () => void;
}

function Sidebar({ toggle }: SidebarProps) {
  return (
    <div className="fixed top-0 start-0 w-full h-full bg-indigo-400 flex items-center justify-center">
      <button onClick={toggle} className="absolute top-2 end-2">
        <IoClose size="35"/>
      </button>
      <Menu className="text-2xl" vertical/>
    </div>
  )
}

export default Sidebar