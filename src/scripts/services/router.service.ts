import { type Route, Router } from "./router";
import { renderLogin } from "../pages/login/index";
import { StoredUser } from "../pages/login/types";
import { renderDashboard } from "../pages/dashboard";
import { renderQuiz } from "../pages/quiz";
import { renderStatistic } from "../pages/statistic";


function checkAuth(): boolean {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return false;

  try {
    const user = JSON.parse(currentUser) as StoredUser;
    return !!user.email;
  } catch {
    return false;
  }
}

let isAuth: boolean = checkAuth();

const setAuth = (value: boolean): void => {
  isAuth = value;
  if (!value) {
    localStorage.removeItem('currentUser');
  }
};

const routes: Route[] = [
  {
    path: "/",
    render: () => renderLogin(router, setAuth)
  },
  {
    path: "/dashboard",
    render: () => renderDashboard(router, setAuth),
    protected: true
  },
  {
    path: "/quiz",
    render: () => renderQuiz(router),
    protected: true
  },
  {
    path: "/statistic",
    render: () => renderStatistic(router),
    protected: true
  }
];

const router = new Router(routes, () => isAuth);
router.init();


