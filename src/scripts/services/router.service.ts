import { type Route, Router } from './router';
import { renderLogin } from '../pages/login';
import { renderDashboard } from '../pages/dashboard';
import { renderQuiz } from '../pages/quiz/quiz';
import { renderStatistic } from '../pages/statistic';
import { render404Page } from '../pages/404/404';
import { setIndex } from '../pages/quiz/quiz.state';


function checkAuth(): boolean {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return false;

  try {
    const parsed = JSON.parse(currentUser) as unknown;

    return (
      typeof parsed === 'object' && parsed !== null && 'email' in parsed && typeof (parsed as {email?: unknown}).email === 'string'
    );
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

export function initRouter(): void {
  //const savedRoute = getCurrentRoute();

 /*  if (savedRoute && savedRoute !== window.location.pathname + window.location.hash) {
    history.replaceState({}, '', savedRoute);
  } */

  const routes: Route[] = [
    {
      path: '/',
      render: () => renderLogin(router, setAuth)
    },
    {
      path: '/dashboard',
      render: () => renderDashboard(router, setAuth),
      protected: true
    },
    {
      path: '/quiz',
      render: (): void => {
        const hash = window.location.hash.replace('#', '')
        const indexFromHash = Number(hash) - 1
        if (!isNaN(indexFromHash) && indexFromHash >= 0) {
          setIndex(indexFromHash)
        }
        void renderQuiz(router)
      },

      protected: true
    },
    {
      path: '/statistic',
      render: () => renderStatistic(router),
      protected: true
    }
  ]

  const router = new Router(routes, () => isAuth, () => render404Page(router));

  router.init()
}
