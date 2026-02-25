import { Router } from "../services/router";

export function renderLogin(router: Router, setAuth: (value: boolean) => void ) {
  const root = document.getElementById("app")!;
  root.innerHTML = `
    <h1>Login Page</h1>
    <button id="loginBtn">Login</button>
  `;

  document.getElementById("loginBtn")!.onclick = () => {
    setAuth(true);
    router.navigate("/dashboard");
  };
}