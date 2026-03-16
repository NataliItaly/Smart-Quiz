import {
  getUIState,
  updateUIState,
  resetUIState,
  getIndex,
  setIndex,
  getScore,
  setScore,
  resetState
} from '../scripts/pages/quiz/quiz.state';

import { describe, test, expect, beforeEach } from 'vitest';

describe("Quiz UI State", () => {
  beforeEach(() => {
    resetUIState();
  });

  test("initial UI state is correct", () => {
    const ui = getUIState();
    expect(ui.selectedOption).toBe(null);
    expect(ui.isChecked).toBe(false);
    expect(ui.showNext).toBe(false);
    expect(ui.showTryAgain).toBe(false);
    expect(ui.showExplain).toBe(false);
    expect(ui.showExplanation).toBe(false);
    expect(ui.isCorrect).toBe(null);
    expect(ui.locked).toBe(false);
  });

  test("updateUIState updates only provided fields", () => {
    updateUIState({ selectedOption: "A", isChecked: true });
    const ui = getUIState();

    expect(ui.selectedOption).toBe("A");
    expect(ui.isChecked).toBe(true);

    // остальные поля должны остаться как в initialUIState
    expect(ui.showNext).toBe(false);
    expect(ui.showTryAgain).toBe(false);
  });

  test("resetUIState resets all fields to initial values", () => {
    updateUIState({ selectedOption: "B", showNext: true });
    resetUIState();
    const ui = getUIState();

    expect(ui.selectedOption).toBe(null);
    expect(ui.showNext).toBe(false);
  });
});

describe("Quiz Progress State", () => {
  beforeEach(() => {
    resetState();
  });

  test("setIndex and getIndex work correctly", () => {
    setIndex(3);
    expect(getIndex()).toBe(3);
  });

  test("setScore and getScore work correctly", () => {
    setScore(5);
    expect(getScore()).toBe(5);
  });

  test("resetState resets index and score", () => {
    setIndex(4);
    setScore(10);
    resetState();

    expect(getIndex()).toBe(0);
    expect(getScore()).toBe(0);
  });
});