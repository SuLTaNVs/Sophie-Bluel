const repEmail = document.querySelector("#email");
const repPassword = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton");
const invalid = document.querySelector("#error");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const email = repEmail.value;
  const password = repPassword.value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        error.classList.remove("hide");
        throw new Error("Impossible de connecter l'utilisateur");
      }
      error.classList.add("hide");
      return response.json();
    })

    .then((data) => {
      window.location.href = "index.html";
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId);
    })
    .catch((error) => {
      console.log(error);
    });
});
