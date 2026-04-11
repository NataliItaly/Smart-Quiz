import { createElement } from "../utils/createElement";
import { clearQuiz } from "../states/questionsState";
import { Router } from "../services/router";
import { setIndex, setScore } from "../pages/quiz/quiz.state";
import { getQuiz } from "../states/questionsState";
import { getScore } from "../pages/quiz/quiz.state";
import { statisticsService } from "../services/statisticsService";
import { getUser } from "../states/userState";

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

    const user = getUser();
    const score = getScore();

    const quizState = getQuiz();
    const currentQuestions = quizState.currentQuestions;
    const total = currentQuestions ? currentQuestions.length : 0;

    const category = quizState.selectedCategory;
    const level = quizState.selectedLevel;
    const finalCategory = category || 'JS & TS';
    const finalLevel = level || 'medium';

    if (user.id && total > 0) {
      statisticsService.saveAttempt({
        userId: user.id,
        score: score,
        total: total,
        category: finalCategory,
        level: finalLevel
      });

      console.log(`✅ Quiz finished! Score: ${score}/${total}`);
      console.log(`Category: ${finalCategory}, Level: ${finalLevel}`);
    } else {
      console.warn('⚠️ Cannot save attempt: missing user.id or questions');
      console.log('User:', user);
      console.log('Total questions:', total);
    }


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