import { useForm, SubmitHandler } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

// Componente LoginPage que maneja el inicio de sesión del usuario con validación de formulario usando react-hook-form.
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange", // Validación en tiempo real
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Inicio de sesión exitoso:", result);
        // Redirige o muestra una notificación de éxito
      } else {
        console.error("Error al iniciar sesión:", result.message);
        // Muestra un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
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
