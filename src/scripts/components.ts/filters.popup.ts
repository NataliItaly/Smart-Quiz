import { createElement } from "../utils/createElement";
import { Category, Level, Mode } from "../pages/quiz/quiz.types";

export function filtersPopup(category: Category | undefined, level: Level | undefined, mode: Mode): HTMLElement {
  const popup = createElement({
    tag: 'div',
    className: 'popup',
    id: 'filters-popup'
  })
  const popupContent = createElement({
    tag: 'div',
    className: 'filters-popup__content',
    id: 'popup-content',
    text: 'You have choosed:'
  })
  const popupCategoryRow = createElement({
    tag: 'p',
    className: 'filters-popup__category',
    id: 'popup-category',
    text: `Category`
  })
  const popupCategory = createElement({
    tag: 'span',
    className: 'filters-popup__span',
    id: 'popup-category-span',
    text: `${category ? category : 'Any'}`
  })
  popupCategoryRow.append(popupCategory);

  const popupLevelRow = createElement({
    tag: 'p',
    className: 'filters-popup__level',
    id: 'popup-level',
    text: `Level`
  })
  const popupLevel = createElement({
    tag: 'span',
    className: 'filters-popup__span',
    id: 'popup-level-span',
    text: `${level ? level : 'Any'}`
  })
  popupLevelRow.append(popupLevel);

  const popupModeRow = createElement({
    tag: 'p',
    className: 'filters-popup__mode',
    id: 'popup-mode',
    text: `Mode`
  })
  const popupMode = createElement({
    tag: 'span',
    className: 'filters-popup__span',
    id: 'popup-mode-span',
    text: `${mode}`
  })
  popupModeRow.append(popupMode);

  popupContent.append(popupCategoryRow, popupLevelRow, popupModeRow);

  if (mode === 'Exam') {
    const popupMessage = createElement({
      tag: 'p',
      className: 'filters-popup__message',
      id: 'popup-message',
      text: `Note: Once you start the quiz, you cannot leave the page. Otherwise, the quiz will be marked as failed.`
    });
    popupContent.append(popupMessage);
  }

  popup.append(popupContent)

  return popup;
}