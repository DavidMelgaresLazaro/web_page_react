import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  address: string;
};

// Este componente maneja el registro de usuario con validación de formulario usando react-hook-form
export default function RegisterPage() {
  const { logIn } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    mode: "onChange", // Validación en tiempo real
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      // Primero intentamos registrar al usuario
      const registerResponse = await fetch(
        "https://web-page-react.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        console.error("Error al registrar:", error.message);
        alert(`Error al registrar: ${error.message}`);
        return;
      }

      console.log("Registro exitoso. Iniciando sesión...");

      // Después intentamos iniciar sesión automáticamente con las credenciales del usuario registrado
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        logIn(result); // Llamamos a logIn para actualizar el estado global en el contexto

        console.log("Inicio de sesión exitoso:", result);
        navigate("/"); // Redirige al perfil

        alert(`Registro exitoso: ${result.name}`);
      } else {
        console.error("Error al iniciar sesión:", result.message);
        alert(`Error: ${result.message || "Credenciales incorrectas"}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Registro
        </h2>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* Campo Nombre */}
          <div className="relative mb-6">
            <input
              {...register("name", {
                required: "Nombre requerido",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 10, message: "Máximo 10 caracteres" },
              })}
              className="input"
              type="text"
              placeholder="Nombre..."
            />
            {errors.name && (
              <span className="absolute text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Campo Email */}
          <div className="relative mb-6">
            <input
              {...register("email", {
                required: "Email requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email no válido",
                },
              })}
              className="input"
              type="email"
              placeholder="Email..."
            />
            {errors.email && (
              <span className="absolute text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Campo Contraseña */}
          <div className="relative mb-6">
            <input
              {...register("password", {
                required: "Contraseña requerida",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                maxLength: { value: 16, message: "Máximo 16 caracteres" },
              })}
              className="input"
              type="password"
              placeholder="Contraseña..."
            />
            {errors.password && (
              <span className="absolute text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Campo Dirección */}
          <div className="relative mb-6">
            <input
              {...register("address", {
                required: "Dirección requerida",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              className="input"
              type="text"
              placeholder="Dirección..."
            />
            {errors.address && (
              <span className="absolute text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full bg-indigo-600 text-white font-semibold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
