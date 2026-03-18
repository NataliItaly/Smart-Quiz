export function setCurrentRoute(): void {
  const route = window.location.pathname + window.location.hash
  localStorage.setItem('currentRoute', route)
}

export function getCurrentRoute(): string {
  return localStorage.getItem('currentRoute') || '/';
}