import { Router } from "../services/router";

export function renderQuiz(router: Router) {
  const root = document.getElementById("app")!;
  root.innerHTML = `
    <h1>Quiz Page</h1>
    <button id="backBtn">Back</button>
  `;

  document.getElementById("backBtn")!.onclick = () => {
    router.navigate("/dashboard");
  };
}