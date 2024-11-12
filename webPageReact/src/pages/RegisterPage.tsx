import { useForm } from "react-hook-form";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit, formState } = useForm<RegisterFormValues>({
    mode: "onChange",
  });

  const { errors, isValid } = formState;

  function onSubmit(data: RegisterFormValues) {
    console.log("Registro exitoso:", data);
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <h2>Registro</h2>

      <div className="relative mb-8">
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
          <span className="absolute text-red-300 text-sm">
            {errors.name.message}
          </span>
        )}
      </div>

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
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-green-400 px-4 py-2"
      >
        Registrar
      </button>
    </form>
  );
}
