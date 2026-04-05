import { createElement } from "../utils/createElement";
import { FilterOptions } from "../pages/quiz/quiz.types";
import { clearQuiz, getQuiz, questionFilter, updateQuiz } from "../states/questionsState";
import { toCategory, toLevel, toMode } from "../utils/filter.options.types.converter";
import { filtersPopup } from "./filters.popup";


export function renderFiltersForm(): HTMLFormElement {
  const filterForm = createElement({tag: 'form', className: 'form', id: 'filter-form'});

  const filterOptions: FilterOptions = {category: ['All', 'HTML', 'CSS & SCSS', 'JS & TS'], level: ['All', 'easy', 'medium', 'hard'], mode: ['Train', 'Exam']};

  (Object.keys(filterOptions) as (keyof FilterOptions)[]).forEach(option => {
    const formRow = createElement({tag: 'div', className: 'form__row'});
    const label: HTMLLabelElement = createElement({tag: 'label', className: 'form__label', text: `Choose ${option}`, attributes: {for: option}});
    const select: HTMLSelectElement = createElement({tag: 'select', className: 'form__select', id: option});

    filterOptions[option].forEach(opt => {
      const optionEl: HTMLOptionElement = createElement({tag: 'option', className: 'form__option', id: opt.toLowerCase(), text: opt});
      optionEl.value = opt === 'All' ? '' : opt;
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
    const modeSelect = document.getElementById('mode') as HTMLSelectElement

    const choosenCategory = categorySelect.value;
    const choosenLevel = levelSelect.value;
    const choosenMode = modeSelect.value;

    console.log('choosen mode', choosenMode)

    // clear previous quiz
    clearQuiz();
    console.log('get quiz befre clear', getQuiz())

    // set new quiz
    updateQuiz({currentQuestions: [], selectedCategory: toCategory(choosenCategory), selectedLevel: toLevel(choosenLevel), selectedMode: toMode(choosenMode)});
    console.log('quiz from state on submit', getQuiz())
    questionFilter.category = toCategory(choosenCategory);
    questionFilter.level = toLevel(choosenLevel);
    questionFilter.mode = toMode(choosenMode);

    const popup = filtersPopup(toCategory(choosenCategory), toLevel(choosenLevel), toMode(choosenMode));
    filterForm.append(popup);

    window.setTimeout(function() {
      popup.classList.add('filters-popup_fading')
      window.setTimeout(function() {
        popup.remove();
      }, 0)
    }, 5000)
  });


  return filterForm;
}