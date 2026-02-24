import { Router } from "../services/router";

export function renderDashboard(router: Router, setAuth: (value: boolean) => void) {
  const root = document.getElementById("app")!;
  root.innerHTML = `
    <h1>Dashboard</h1>
    <button id="logoutBtn">Logout</button>
    <button id="quizBtn">Go to Quiz</button>
  `;

  document.getElementById("logoutBtn")!.onclick = () => {
    setAuth(false);
    router.navigate("/");
  };

  document.getElementById("quizBtn")!.onclick = () => {
    router.navigate("/quiz");
  };
}