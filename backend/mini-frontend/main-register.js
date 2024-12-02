const $formRegister = document.querySelector('.form-register');

$formRegister.onsubmit = (event) => {
  event.preventDefault();
  const name = $formRegister.name.value;
  const email = $formRegister.email.value;
  const password = $formRegister.password.value;
  const role = $formRegister.role.value;

  const newUser = {
    name,
    email,
    password,
    role,
  };

  fetch('http://localhost:4321/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
