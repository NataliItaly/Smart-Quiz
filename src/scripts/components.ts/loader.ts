import { createElement } from "../utils/createElement"

export function renderLoader(): HTMLElement {
  const loader = createElement({tag: 'div', className: 'loader', id: 'loader'});
  const loaderText = createElement({tag: 'div', className: 'loader__text', id: 'loader-text', text: 'Loading'});
  const loaderSpinner = createElement({tag: 'div', className: 'loader__spinner', id: 'loader-spinner'});

  loader.append(loaderText, loaderSpinner);
  return loader;
}