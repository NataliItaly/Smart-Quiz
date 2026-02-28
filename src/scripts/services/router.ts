export type Route = {
  path: string;
  render: () => void;
  protected?: boolean;
};


export class Router {
  private routes: Route[];
  private isAuth: () => boolean;

   constructor(routes: Route[], isAuth: () => boolean) {
    this.routes = routes;
    this.isAuth = isAuth;
  }

  public init() {
    window.addEventListener("popstate", () => this.handleLocation());
    //window.addEventListener("DOMContentLoaded", () => this.handleLocation());
    this.handleLocation();
  }

  public navigate(path: string) {
    history.pushState({}, "", path);
    //this.handleLocation();
  }

  private handleLocation() {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path);

    if (!route) {
      document.getElementById("app")!.innerHTML = "<h1>404</h1>";
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