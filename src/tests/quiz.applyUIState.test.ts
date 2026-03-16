import { updateUIState, resetUIState, applyUIState } from "../scripts/pages/quiz/quiz.state";

describe("applyUIState — component logic / state management", () => {
  let checkBtn: HTMLButtonElement;
  let nextBtn: HTMLButtonElement;
  let tryBtn: HTMLButtonElement;
  let explainBtn: HTMLButtonElement;
  let explainEl: HTMLElement;

  beforeEach(() => {
    resetUIState();

    checkBtn = document.createElement("button");
    nextBtn = document.createElement("button");
    tryBtn = document.createElement("button");
    explainBtn = document.createElement("button");
    explainEl = document.createElement("p");
  });

  test("Check button is disabled when no option selected", () => {
    updateUIState({ selectedOption: null });
    applyUIState({ checkBtn, nextBtn, tryBtn, explainBtn, explainEl });

    expect(checkBtn.disabled).toBe(true);
  });

  test("Check button is enabled when option selected", () => {
    updateUIState({ selectedOption: "A" });
    applyUIState({ checkBtn, nextBtn, tryBtn, explainBtn, explainEl });

    expect(checkBtn.disabled).toBe(false);
  });

  test("Next button appears only when showNext = true", () => {
    updateUIState({ showNext: true });
    applyUIState({ checkBtn, nextBtn, tryBtn, explainBtn, explainEl });

    expect(nextBtn.style.display).toBe("block");
  });

  test("Try again button appears only when showTryAgain = true", () => {
    updateUIState({ showTryAgain: true });
    applyUIState({ checkBtn, nextBtn, tryBtn, explainBtn, explainEl });

    expect(tryBtn.style.display).toBe("block");
  });

  test("Explain button appears only when showExplain = true", () => {
    updateUIState({ showExplain: true });
    applyUIState({ checkBtn, nextBtn, tryBtn, explainBtn, explainEl });

    expect(explainBtn.style.display).toBe("block");
  });

  test("Explanation text appears only when showExplanation = true", () => {
    updateUIState({ showExplanation: true });
    applyUIState({ checkBtn, nextBtn, tryBtn, explainBtn, explainEl });

    expect(explainEl.style.display).toBe("block");
  });
});