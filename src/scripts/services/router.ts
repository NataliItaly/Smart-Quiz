export class Router {
  navigate(path: string) {
    history.pushState({}, "", path);
    this.handleLocation();
  }

  private handleLocation() {
  }
}