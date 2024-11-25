import { Link, Outlet } from "react-router-dom"

function ProfilePage() {
  return (
    <div className="flex gap-4">
      <div className="bg-sky-200 p-4">
        <nav className="flex flex-col gap-4 items-center">
          <Link to="/profile/books">Books</Link>
          <Link to="/profile/account">Account</Link>
        </nav>
      </div>


      <div className="py-4">

        <h1>Tu perfil <img className="w-16 inline" src="https://randomuser.me/api/portraits/men/3.jpg" alt="" /></h1>
        
        <Outlet />

      </div>
      
    </div>
  )
}

export default ProfilePage