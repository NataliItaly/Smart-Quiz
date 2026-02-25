import { Router } from "../services/router";

export function renderStatistic(router: Router) {
  const root = document.getElementById("app")!;
  root.innerHTML = `
    <h1>Statistic Page</h1>
    <button id="backBtn">Back</button>
  `;

  document.getElementById("backBtn")!.onclick = () => {
    router.navigate("/dashboard");
  };
}