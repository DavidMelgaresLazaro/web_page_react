import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext"; // Asegúrate de importar el hook para acceder al contexto

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { logIn } = useUserContext(); // Usamos logIn para actualizar el contexto
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await fetch(
        "https://web-page-react.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        logIn(result);

        console.log("Inicio de sesión exitoso:", result);
        navigate("/");

        alert(`Inicio de sesión exitoso: ${result.name}`);
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
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Iniciar Sesión
        </h2>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full bg-indigo-600 text-white font-semibold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
