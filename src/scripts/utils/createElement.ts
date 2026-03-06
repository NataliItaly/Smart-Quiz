export interface CreateElementOptions {
  tag: keyof HTMLElementTagNameMap;
  className: string | string[];
  id?: string;
  text?: string;
  attributes?: Record<string, string>;
}

export function createElement<T extends keyof HTMLElementTagNameMap>(options: CreateElementOptions & {tag: T}): HTMLElementTagNameMap[T] {
  const el = document.createElement(options.tag);
  if (options.className) {
    const classes = Array.isArray(options.className) ? options.className : [options.className];
    el.classList.add(...classes);
  }
  if (options.id) el.id = options.id;
  if (options.text) el.textContent = options.text;
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => el.setAttribute(key, value))
  }
  return el;
}