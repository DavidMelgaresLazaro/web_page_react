import { useState } from "react";

export default function AdvancedControlledForm() {
  //* Paso 1: Crear un estado para todos los  inputs
  const [formValues, setFormValues] = useState({
    email: '',
    user: '',
    password: '',
    plataform: '',
    country: '',
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



  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User..."
        name="user"
        value={formValues.user}  
        onChange={handleFormChange}
      />
      <input
        type="text"
        placeholder="Email..."
        name="email"
        value={formValues.email}  
        onChange={handleFormChange}
      />
      <br />

      <input
        type="password"
        placeholder="Contraseña..."
        name="password"
        value={formValues.password} // Enlazar el valor del input con el estado
        onChange={handleFormChange}
      />


      <br />

      <select
        name="plataform"
        value={formValues.plataform} // Enlazar el valor del select con el estado
        onChange={handleFormChange}
      >
        <option value="">Selecciona una plataforma...</option>
        <option value="PS5">PS5</option>
        <option value="XBOX">XBOX</option>
        <option value="PC">PC</option>
      </select>

      <br />

      <input
        type="text"
        placeholder="Country..."
        name="country"
        value={formValues.password} // Enlazar el valor del input con el estado
        onChange={handleFormChange}
      />

      <button type="submit">Enviar</button>

      <pre>
        <h2>{JSON.stringify(formValues, null, 2)}</h2>
      </pre>
    </form>
  );
}
