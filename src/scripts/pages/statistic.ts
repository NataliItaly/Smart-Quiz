import { Router } from "../services/router";

export function renderStatistic(router: Router): void {
  const root = document.getElementById("app")!;
  root.innerHTML = `
    <h1>Statistic Page</h1>
    <button id="backBtn">Back</button>
  `;

  document.getElementById("backBtn")!.onclick = (): void => {
    router.navigate("/dashboard");
  };
}