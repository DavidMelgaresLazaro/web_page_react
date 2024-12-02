const $formRegister = document.querySelector(".form-register");

$formRegister.onsubmit = (event) => {
  event.preventDefault();
  const name = $formRegister.name.value;
  const email = $formRegister.email.value;
  const password = $formRegister.password.value;
  const role = $formRegister.role.value;

  // Create an object with the values from the form fields
  const newUser = {
    name,
    email,
    password,
    role,
  };

  // Send the data to the server using the Fetch API
  fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
