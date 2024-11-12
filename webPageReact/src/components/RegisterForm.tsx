import { useState } from "react";

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    platform: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    platform: "",
  });

  const [touchedForm, setTouchedForm] = useState({
    name: false,
    email: false,
    password: false,
    country: false,
    platform: false,
  });

  const isValidForm =
    formValues.name &&
    formValues.email &&
    formValues.password &&
    formValues.country &&
    formValues.platform &&
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.country &&
    !errors.platform;

  function validateForm(event) {
    const { name, value } = event.target;
    let error = "";

    if (name === "name") {
      if (value.length < 3) error = "Mínimo 3 caracteres";
      else if (value.length > 10) error = "Máximo 10 caracteres";
    } else if (name === "email") {
      const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegExp.test(value)) error = "Email inválido";
    } else if (name === "password" && value.length < 6) {
      error = "Mínimo 6 caracteres";
    } else if (name === "country" && value.length < 2) {
      error = "Mínimo 2 caracteres";
    } else if (name === "platform" && value === "") {
      error = "Selecciona una plataforma";
    }

    setErrors({ ...errors, [name]: error });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    validateForm(event);
  }

  return (
    <form className="text-center">
      <h2>Registro</h2>

      {/* Campo Nombre */}
      <div className="relative mb-8">
        <input
          className="input"
          name="name"
          type="text"
          placeholder="Nombre..."
          onChange={handleFormChange}
          onBlur={() => setTouchedForm({ ...touchedForm, name: true })}
        />
        {errors.name && touchedForm.name && (
          <span className="absolute text-red-300 text-sm">{errors.name}</span>
        )}
      </div>

      {/* Campo Email */}
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

      {/* Campo Contraseña */}
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

      {/* Campo País */}
      <div className="relative mb-8">
        <input
          className="input"
          name="country"
          type="text"
          placeholder="País..."
          onChange={handleFormChange}
          onBlur={() => setTouchedForm({ ...touchedForm, country: true })}
        />
        {errors.country && touchedForm.country && (
          <span className="absolute text-red-300 text-sm">{errors.country}</span>
        )}
      </div>

      {/* Campo Plataforma */}
      <div className="relative mb-8">
        <select
          className="input"
          name="platform"
          value={formValues.platform}
          onChange={handleFormChange}
          onBlur={() => setTouchedForm({ ...touchedForm, platform: true })}
        >
          <option value="">Selecciona una plataforma...</option>
          <option value="Xbox">Xbox</option>
          <option value="PS5">PS5</option>
          <option value="PC">PC</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>
        {errors.platform && touchedForm.platform && (
          <span className="absolute text-red-300 text-sm">{errors.platform}</span>
        )}
      </div>

      <button
        disabled={!isValidForm}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 px-4 py-2"
      >
        Registrar
      </button>
    </form>
  );
}
