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
    const validClasses = classes.filter(c => c && typeof c === 'string' && c.trim() !== '');
    if (validClasses.length > 0) {
      el.classList.add(...validClasses);
    }
  }
  if (options.id) el.id = options.id;
  if (options.text) el.textContent = options.text;
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      if (key && typeof key === 'string' && key.trim() !== '') {
        el.setAttribute(key, value);
      }
      });
  }
  return el;
}