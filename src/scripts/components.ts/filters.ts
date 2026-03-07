import { createElement } from "../utils/createElement";

export interface FilterOptions {
  category: string[];
  level: string[];
}

export function filters(): HTMLFormElement {
  const filterForm = createElement({tag: 'form', className: 'form', id: 'filter-form'});

  const filterOptions: FilterOptions = {category: ['All', 'HTML', 'CSS', 'JS'], level: ['random', 'easy', 'medium', 'hard']};

  (Object.keys(filterOptions) as (keyof FilterOptions)[]).forEach(option => {
    const formRow = createElement({tag: 'div', className: 'form__row'});
    const label: HTMLLabelElement = createElement({tag: 'label', className: 'form__label'});
    const select: HTMLSelectElement = createElement({tag: 'select', className: 'form__select'});

    console.log(filterOptions[option])

    filterOptions[option].forEach(opt => {
      const optionEl: HTMLOptionElement = createElement({tag: 'option', className: 'form__option', id: opt, text: opt, attributes: {value: opt.toLowerCase()}})
      select.append(optionEl);
    });
    formRow.append(label, select);

    filterForm.append(formRow);
  });


  return filterForm;
}