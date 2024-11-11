import { useState } from "react";

export default function ControlledForm() {
  console.log('Formulario controlado');
  

  //* Paso 1: Crear un estado por cada input
  const [inputNameValue, setInputNameValue] = useState('');

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(inputNameValue);
    
  }

  function handleNameChange (event: React.ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.value);

    //* Paso 3: Cambia el estado por cada tecla apretada
    setInputNameValue(event.target.value);
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <input  
        type="text" 
        placeholder="Nombre..."
        //* Paso 2: Escucha el evento onChange
        onChange={handleNameChange}

        //* Paso opcional: Si queremos que el estado también obligue al input a mostrar el valor lo ponemos en su value=""
        value={inputNameValue}
      />
      <button>Enviar</button>

      <button type="button" onClick={() => setInputNameValue('Luis')}>Cambiar estado</button>

      <h2>{inputNameValue}</h2>
    </form>
  )
}
