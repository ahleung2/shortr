import {
  createElement,
  createFooter,
  createHeader,
  createMainContent,
  createSection,
} from "../common/commonElements.js";
import { login } from "./loginApi.js";
import { getQueryParams } from "../common/util.js";

async function setupLogin() {
  const mainContainer = document.querySelector(".main");
  const mainContent = createMainContent();

  const loginSection = createSection("Login");

  const nameLabel = createElement("div", "loginEditLabel", "Username");
  const nameInput = createElement("input");
  nameInput.id = "nameInput";
  nameInput.type = "text";
  nameInput.addEventListener("input", validateLogin);
  const usernameEdit = createElement("div", "loginEdit", null, [
    nameLabel,
    nameInput,
  ]);

  const passwordLabel = createElement("div", "loginEditLabel", "Password");
  const passwordInput = createElement("input");
  passwordInput.id = "passwordInput";
  passwordInput.type = "password";
  passwordInput.addEventListener("input", validateLogin);
  const passwordEdit = createElement("div", "loginEdit", null, [
    passwordLabel,
    passwordInput,
  ]);

  const hintText = createElement(
    "span",
    "hintText",
    "An account will be automatically created if the username does not exist"
  );
  const hintTextContainer = createElement("div", "loginEdit", null, [hintText]);

  const loginButton = createElement("button", null, "Login");
  loginButton.id = "loginButton";
  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await login(nameInput.value, passwordInput.value);
    window.localStorage.setItem("username", nameInput.value);
    window.location.href = getQueryParams().redirect;
  });

  const buttonContainer = createElement("div", "loginEdit", null, [
    loginButton,
  ]);

  const loginContainer = createElement("div", "loginContainer", null, [
    usernameEdit,
    passwordEdit,
    hintTextContainer,
    buttonContainer,
  ]);

  const form = createElement("form", null, null, [loginContainer]);
  loginSection.appendChild(form);

  mainContent.appendChild(loginSection);

  mainContainer.appendChild(createHeader());
  mainContainer.appendChild(mainContent);
  mainContainer.appendChild(createFooter());
  validateLogin();
}

function validateLogin() {
  const username = document.querySelector("#nameInput").value;
  const password = document.querySelector("#passwordInput").value;
  const valid = username && password;

  const loginButton = document.querySelector("#loginButton");
  loginButton.disabled = !valid;
  if (valid) {
    loginButton.classList.remove("disabledButton");
  } else {
    loginButton.classList.add("disabledButton");
  }
}

setupLogin().then();
