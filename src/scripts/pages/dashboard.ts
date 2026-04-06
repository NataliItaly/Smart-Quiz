import { Router } from "../services/router";
import { filters } from "../components.ts/filters";
import { createElement } from "../utils/createElement";
import { getUser } from "../states/userState";


export function renderDashboard(router: Router, setAuth: (value: boolean) => void): void {
  const dashboard = createElement({tag: 'div', className: 'dashboard', id: 'dashboard'});

  // header
  const dashboardHeader = createElement({tag: 'header', className: 'header', id: 'dashboard-header'});

  const userName = getUser().name;
  const userGreetings = createElement({tag: 'h2', className: 'header__greeting', id: 'header-greeting', text: `Wellcome ${userName}`});
  const logoutBtn = createElement({tag: 'button', className: 'dashboard__btn', id: 'dashboard-logout-btn', text: 'Log Out'});

  dashboardHeader.append(userGreetings, logoutBtn);

  const dashboardContent = createElement({tag: 'div', className: 'dashboard__content', id: 'dashboard-content'});

  const dashboardTitle = createElement({tag: 'h1', className: 'dashboard__title', id: 'dashboard-title', text: 'Dashboard'});
  const dashboardQuizBtn = createElement({tag: 'button', className: 'btn', id: 'dashboard-quiz-btn', text: 'Go to Quiz'});

  // filters form
  const filtersEl = filters();

  dashboardContent.append(dashboardTitle, filtersEl, dashboardQuizBtn);
  dashboard.append(dashboardHeader, dashboardContent);

  const root = document.getElementById("app")!;
  root.innerHTML = '';

  root.append(dashboard);

  document.getElementById("dashboard-logout-btn")!.onclick = (): void => {
    setAuth(false);
    router.navigate("/");
  };

  document.getElementById("dashboard-quiz-btn")!.onclick = (): void => {
    router.navigate("/quiz");
  };

}