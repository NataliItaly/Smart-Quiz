import { createElement } from "../utils/createElement";

export interface FilterOptions {
  category: string[];
  level: string[];
}

export function filters(): HTMLFormElement {
  const filterForm = createElement({tag: 'form', className: 'dashboard__form', id: 'filter-form'});

  const filterOptions: FilterOptions = {category: ['HTML', 'CSS', 'JS'], level: ['easy', 'medium', 'hard']};
  filterOptions.forEach(option => {
    const formRow = createElement({tag: 'div', className: 'dashboard__form-row'});
    const label = createElement({tag: 'label', className: 'dashboard__form-label'});
    const select = createElement({tag: 'select', className: 'dashboard__select'});

  })
  return filterForm;
}