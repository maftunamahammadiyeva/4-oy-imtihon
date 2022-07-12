"use strict";
const elForm = document.querySelector(".login__form");
const elUserInput = document.querySelector(".username-input");
const elPasswordInput = document.querySelector(".password-input");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const userValue = elUserInput.value;
  const passwordValue = elPasswordInput.value;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: userValue,
      password: passwordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("homepage.html");
      } else {
        let erorDesc = document.createElement("p");
        erorDesc.setAttribute("class", "text-danger");
        erorDesc.textContent = "please enter again";
        elForm.appendChild(erorDesc);
      }
    });
});
