import { setCurrentRoute, getCurrentRoute } from "../states/routeState";

export type Route = {
  path: string;
  render: () => void;
  protected?: boolean;
};


export class Router {
  private routes: Route[];
  private isAuth: () => boolean;
  private notFound: () => void;

   constructor(routes: Route[], isAuth: () => boolean, notFound: () => void) {
    this.routes = routes;
    this.isAuth = isAuth;
    this.notFound = notFound;
  }

  public init(): void {
    window.addEventListener("popstate", () => this.handleLocation());
    window.addEventListener("DOMContentLoaded", () => this.handleLocation());
    this.handleLocation();
  }

  public navigate(path: string): void {
    history.pushState({}, "", path);

    // set full route
    setCurrentRoute(window.location.pathname + window.location.hash)
    this.handleLocation();
  }

  private handleLocation(): void {
    const fullPath = window.location.pathname + window.location.hash;
    console.log('pathname', window.location.pathname)
    console.log('hash', window.location.hash)

    // don't save the same route twice
    if (getCurrentRoute() !== fullPath) {
      setCurrentRoute(fullPath);
    }

    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path);
    console.log('route', route)

    // save current route
    //setCurrentRoute(window.location.pathname + window.location.hash);


    if (!route) {
      this.notFound();
      return;
    }

    // Auth guard
    if (route.protected && !this.isAuth()) {
      this.navigate("/");
      return;
    }

    route.render();
  }
}