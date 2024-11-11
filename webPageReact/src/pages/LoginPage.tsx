import { useState } from "react";

export default function AdvancedControlledForm() {
  //* Paso 1: Crear un estado para todos los  inputs
  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
    html: false,
    city: ''
  });

  // Función para manejar el envío del formulario
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formValues);
  }

  // Función genérica para manejar los cambios en los inputs
  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, type, value, checked } = event.target;

    // Actualizamos el estado según el tipo del campo (checkbox o no)
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  // Función para cambiar el estado (por ejemplo, al hacer clic en el botón)
  function handleChangeState() {
    setFormValues(prevState => ({
      ...prevState,
      name: "Nuevo Nombre", // Cambia el valor de 'name' cuando se haga clic en el botón
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre..."
        name="name"
        value={formValues.name}  // Enlazar el valor del input con el estado
        onChange={handleFormChange}
      />
      <input
        type="password"
        placeholder="Contraseña..."
        name="password"
        value={formValues.password} // Enlazar el valor del input con el estado
        onChange={handleFormChange}
      />

      <br />

      <label>
        <input
          type="checkbox"
          name="html"
          checked={formValues.html} // Usar 'checked' para el estado del checkbox
          onChange={handleFormChange}
        />
        HTML
      </label>

      <br />

      <select
        name="city"
        value={formValues.city} // Enlazar el valor del select con el estado
        onChange={handleFormChange}
      >
        <option value="">Selecciona una ciudad...</option>
        <option value="barcelona">Barcelona</option>
        <option value="madrid">Madrid</option>
        <option value="sevilla">Sevilla</option>
      </select>

      <br />

      <button type="submit">Enviar</button>

      {/* Botón para cambiar el estado */}
      <button type="button" onClick={handleChangeState}>
        Cambiar nombre
      </button>

      <pre>
        <h2>{JSON.stringify(formValues, null, 2)}</h2>
      </pre>
    </form>
  );
}
