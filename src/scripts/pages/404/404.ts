import { Router } from "../../services/router";

export function render404Page(router: Router): void {
  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = `
    <div>
    <h1>404</h1>
    <p>Page not found</p>
    <button id="back">Back</button>
    </div>
    `
    
    const backBtn = document.getElementById("back");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (history.length > 1) {
          history.back();
        } else {
          router.navigate("/")
        }
      });
    }
  }
}