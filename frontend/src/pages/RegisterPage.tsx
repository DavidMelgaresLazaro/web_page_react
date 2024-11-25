import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  country: string;
  platform: string;
};

// Este componente maneja el registro de usuario con validación de formulario usando react-hook-form
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    mode: "onChange", // Validación en tiempo real
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log("Registro exitoso:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  py-8 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Registro</h2>

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
              <span className="absolute text-red-500 text-sm">{errors.name.message}</span>
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
              <span className="absolute text-red-500 text-sm">{errors.email.message}</span>
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
              <span className="absolute text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Campo País */}
          <div className="relative mb-6">
            <input
              {...register("country", {
                required: "País requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              className="input"
              type="text"
              placeholder="País..."
            />
            {errors.country && (
              <span className="absolute text-red-500 text-sm">{errors.country.message}</span>
            )}
          </div>

          {/* Campo Plataforma */}
          <div className="relative mb-6">
            <select
              {...register("platform", {
                required: "Selecciona una plataforma",
              })}
              className="input"
            >
              <option value="">Selecciona una plataforma...</option>
              <option value="Xbox">Xbox Series X</option>
              <option value="PS5">PS5</option>
              <option value="PC">PC</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>
            {errors.platform && (
              <span className="absolute text-red-500 text-sm">{errors.platform.message}</span>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full bg-indigo-600 text-white font-semibold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
