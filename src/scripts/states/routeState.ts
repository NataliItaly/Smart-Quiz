let currentRoute = localStorage.getItem('currentRoute') || '/';

export function setCurrentRoute(route: string): void {
  currentRoute = window.location.pathname + window.location.hash
  localStorage.setItem('currentRoute', route);
}

export function getCurrentRoute(): string {
  return currentRoute;
}