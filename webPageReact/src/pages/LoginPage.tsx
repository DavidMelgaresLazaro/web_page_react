import { useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    mode: "onChange",
  });

  const { errors, isValid } = formState;

  function onSubmit(data: LoginFormValues) {
    console.log("Inicio de sesión exitoso:", data);
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <h2>Iniciar Sesión</h2>

      <div className="relative mb-8">
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
          <span className="absolute text-red-300 text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="relative mb-8">
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
          <span className="absolute text-red-300 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        disabled={!isValid}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-400 px-4 py-2"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
