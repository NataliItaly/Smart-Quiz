import { createElement } from "../utils/createElement";
import { clearQuiz } from "../states/questionsState";
import { Router } from "../services/router";
import { setIndex, setScore } from "../pages/quiz/quiz.state";

export function finishQuizPopup(router: Router): HTMLElement {
  const popup = createElement({tag: 'div', className: 'popup_finish', id: 'popup-finish'});
  const popupTitle = createElement({tag: 'h3', className: 'popup__title', id: 'title-finish', text: 'Are you sure you want to finish current quiz?'});
  const popupNav = createElement({
    tag: 'div',
    className: 'popup__buttons',
    id: 'popup-nav'
  })
  const popupYesBtn = createElement({
    tag: 'button',
    className: 'popup__btn',
    id: 'finish-yes',
    text: 'Yes'
  })
  popupYesBtn.addEventListener('click', function () {
    clearQuiz();
    popup.remove()
    router.navigate('/dashboard')
    setIndex(0)
    setScore(0)
  })

  const popupNoBtn = createElement({
    tag: 'button',
    className: 'popup__btn',
    id: 'finish-no',
    text: 'No'
  })
  popupNoBtn.addEventListener('click', function () {
    popup.remove()
  })

  const popupCloseBtn = createElement({
    tag: 'button',
    className: 'popup__close-btn',
    id: 'finish-close-btn',
    text: 'x'
  })
  popupCloseBtn.addEventListener('click', function() {
    popup.remove()
  })

  popupNav.append(popupYesBtn, popupNoBtn)
  popup.append(popupTitle, popupNav, popupCloseBtn)

  return popup
}