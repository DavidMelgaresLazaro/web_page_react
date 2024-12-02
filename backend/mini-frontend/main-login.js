const $formLogin = document.querySelector(".form-login");

$formLogin.onsubmit = async (event) => {
  event.preventDefault();

  const email = $formLogin.email.value;
  const password = $formLogin.password.value;

  const resp = await fetch("http://localhost:4321/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();

  console.log(data);
};
