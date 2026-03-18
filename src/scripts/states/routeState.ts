let currentRoute = localStorage.getItem('currentRoute') || '/';

export function setCurrentRoute(route: string): void {
  currentRoute = route;
  localStorage.setItem('currentRoute', route);
}

export function getCurrentRoute(): string {
  return currentRoute;
}