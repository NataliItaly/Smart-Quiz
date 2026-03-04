export function createExplainContainer(): HTMLElement {
  const container = document.createElement('div')
  container.className = 'explain-container'
  container.classList.add("explain", "hidden");
  return container;  
}

export function showExplain(text: string): void {
  const container = document.getElementById("explain-container") as HTMLDivElement;
  if (!container) return;

  container.innerHTML = text;
  container.classList.remove("hidden");
}