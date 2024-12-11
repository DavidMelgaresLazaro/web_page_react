import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState<null | {
    name: string;
    email: string;
    address: string;
  }>(null);
  useEffect(() => {
    const userString = localStorage.getItem("gamexx-user");
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al coger los datos:", error);
      }
    }
  }, []);

  if (!user) {
    return <div>No hay datos almacenados para 'user'.</div>;
  }

  return (
    <div className="mb-80 mt-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border-2 border-zinc-400">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">
          Perfil de Usuario
        </h1>
        <div className="space-y-4 text-white">
          <div>
            <span className="font-semibold text-yellow-400">Nombre</span>
            <p className="text-black">{user.name}</p>
          </div>
          <div>
            <span className="font-semibold text-yellow-400">
              Correo Electrónico
            </span>
            <p className="text-black">{user.email}</p>
          </div>
          <div>
            <span className="font-semibold text-yellow-400">Localidad</span>
            <p className="text-black">{user.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
