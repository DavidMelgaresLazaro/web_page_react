import { useState } from "react";

export default function AdvancedControlledForm() {
  //* Paso 1: Crear un estado para todos los  inputs
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    
  });

  // Función para manejar el envío del formulario
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formValues);
  }

  // Función genérica para manejar los cambios en los inputs
  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, type, value } = event.target;

    // Actualizamos el estado según el tipo del campo (checkbox o no)
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  

  return (
    <form onSubmit={handleSubmit}>
      <h1>LOGIN</h1>
      <p>Correo:</p>
      <input
        type="text"
        placeholder="Email..."
        name="email"
        value={formValues.email}  // Enlazar el valor del input con el estado
        onChange={handleFormChange}
      />
      <p>Contraseña:</p>
      <input
        type="password"
        placeholder="Contraseña..."
        name="password"
        value={formValues.password} // Enlazar el valor del input con el estado
        onChange={handleFormChange}
      />

      <br />

      <br />

      <button type="submit">Enviar</button>
  
      
    </form>
  );
}
