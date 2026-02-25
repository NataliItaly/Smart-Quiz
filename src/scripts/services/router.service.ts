import { type Route, Router } from "./router";
import { renderLogin } from "../pages/login";
import { renderDashboard } from "../pages/dashboard";
import { renderQuiz } from "../pages/quiz";
import { renderStatistic } from "../pages/statistic";

let isAuth: boolean = true;

const routes: Route[] = [
  {
    path: "/",
    render: () => renderLogin(router, (value) => (isAuth = value))
  },
  {
    path: "/dashboard",
    render: () => renderDashboard(router, (value) => (isAuth = value)),
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


