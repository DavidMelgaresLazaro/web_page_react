const $formLogin = document.querySelector(".form-login");

$formLogin.onsubmit = async (event) => {
  event.preventDefault();

  const email = $formLogin.email.value;
  const password = $formLogin.password.value;

  // Send a POST request to the server with the email and password
  const resp = await fetch("http://localhost:4321/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // Parse the JSON response from the server
  const data = await resp.json();

  console.log(data);
};
