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
    this.handleLocation();
  }

  private handleLocation(): void {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path);

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