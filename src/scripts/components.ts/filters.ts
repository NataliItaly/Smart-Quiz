import { createElement } from "../utils/createElement";
import { FilterOptions } from "../pages/quiz/quiz.types";
import { filterQuestions } from "../utils/filter.questions";

export function filters(): HTMLFormElement {
  const filterForm = createElement({tag: 'form', className: 'form', id: 'filter-form'});

  const filterOptions: FilterOptions = {category: ['All', 'HTML', 'CSS', 'JS'], level: ['random', 'easy', 'medium', 'hard']};

  (Object.keys(filterOptions) as (keyof FilterOptions)[]).forEach(option => {
    const formRow = createElement({tag: 'div', className: 'form__row'});
    const label: HTMLLabelElement = createElement({tag: 'label', className: 'form__label'});
    const select: HTMLSelectElement = createElement({tag: 'select', className: 'form__select', id: option});

    console.log(filterOptions[option])

    filterOptions[option].forEach(opt => {
      const optionEl: HTMLOptionElement = createElement({tag: 'option', className: 'form__option', id: opt.toLowerCase(), text: opt, attributes: {value: opt.toLowerCase()}})
      select.append(optionEl);
    });
    formRow.append(label, select);

    filterForm.append(formRow);
  });

  const filterBtn = createElement({tag: 'button', className: 'btn', id: 'filter-btn', text: 'Apply Filters', attributes: {type: 'submit'}});
  filterForm.append(filterBtn);

  filterForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const categorySelect = document.getElementById('category') as HTMLSelectElement;
    const levelSelect = document.getElementById('level') as HTMLSelectElement;
    const choosenCategory = categorySelect.value;
    const choosenLevel = levelSelect.value;

    if (!choosenCategory && !choosenLevel) return;

    filterQuestions(choosenCategory, choosenLevel);

  });


  return filterForm;
}