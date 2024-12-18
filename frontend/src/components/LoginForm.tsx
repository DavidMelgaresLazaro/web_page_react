import { useState } from "react";

export default function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touchedForm, setTouchedForm] = useState({
    email: false,
    password: false,
  });

  const isValidForm =
    formValues.email &&
    formValues.password &&
    !errors.email &&
    !errors.password;

  // Validación del formulario con el tipo de evento especificado
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    let error = "";

    if (name === "email") {
      const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegExp.test(value)) error = "Email inválido";
    } else if (name === "password" && value.length < 6) {
      error = "Mínimo 6 caracteres";
    }

    setErrors({ ...errors, [name]: error });
  }

  // Manejo del cambio en los campos con el tipo de evento especificado
  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    validateForm(event);
  }

  return (
    <form>
      <h2>Login</h2>

      <div className="relative mb-8">
        <input
          className="input"
          name="email"
          type="email"
          placeholder="Email..."
          onChange={handleFormChange}
          onBlur={() => setTouchedForm({ ...touchedForm, email: true })}
        />
        {errors.email && touchedForm.email && (
          <span className="absolute text-red-300 text-sm">{errors.email}</span>
        )}
      </div>

      <div className="relative mb-8">
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Contraseña..."
          onChange={handleFormChange}
          onBlur={() => setTouchedForm({ ...touchedForm, password: true })}
        />
        {errors.password && touchedForm.password && (
          <span className="absolute text-red-300 text-sm">
            {errors.password}
          </span>
        )}
      </div>

      <button
        disabled={!isValidForm}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 px-4 py-2"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
