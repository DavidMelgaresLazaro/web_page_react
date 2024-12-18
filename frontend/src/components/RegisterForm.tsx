import { useState } from "react";

// Define un tipo para las claves del formulario
type FormField = "name" | "email" | "password" | "country" | "platform";

export default function RegisterForm() {
  const [formValues, setFormValues] = useState<Record<FormField, string>>({
    name: "",
    email: "",
    password: "",
    country: "",
    platform: "",
  });

  const [errors, setErrors] = useState<Record<FormField, string>>({
    name: "",
    email: "",
    password: "",
    country: "",
    platform: "",
  });

  const [touchedForm, setTouchedForm] = useState<Record<FormField, boolean>>({
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

  function validateForm(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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

  function handleFormChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target as { name: FormField; value: string };

    setFormValues({
      ...formValues,
      [name]: value,
    });

    validateForm(event);
  }

  return (
    <form className="bg-white p-8 rounded-lg shadow-md w-96 border-2 border-zinc-400 text-center">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Registro</h2>

      {["name", "email", "password", "country"].map((field) => (
        <div key={field} className="relative mb-8">
          <input
            className="input w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}...`}
            onChange={handleFormChange}
            onBlur={() => setTouchedForm({ ...touchedForm, [field]: true })}
          />
          {errors[field as FormField] && touchedForm[field as FormField] && (
            <span className="absolute text-red-500 text-sm mt-1">
              {errors[field as FormField]}
            </span>
          )}
        </div>
      ))}

      <div className="relative mb-8">
        <select
          className="input w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          name="platform"
          onChange={handleFormChange}
          onBlur={() => setTouchedForm({ ...touchedForm, platform: true })}
        >
          <option value="">Selecciona una plataforma...</option>
          {["Xbox", "PS5", "PC", "Nintendo Switch"].map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        {errors.platform && touchedForm.platform && (
          <span className="absolute text-red-500 text-sm mt-1">
            {errors.platform}
          </span>
        )}
      </div>

      <button
        disabled={!isValidForm}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-yellow-400 text-white px-4 py-2 rounded-lg"
      >
        Registrar
      </button>
    </form>
  );
}
