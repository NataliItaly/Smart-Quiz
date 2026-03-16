import { describe, it, expect, beforeEach } from "vitest";
import { filterQuestions } from "../scripts/utils/filter.questions";
import { QuestionsState } from "../scripts/states/questionsState";
import { Category, Level, Question } from "../scripts/pages/quiz/quiz.types";

describe("filterQuestions", () => {
  const mockQuestions: Question[] = [
    {
      id: 1111,
      question_ru: "Какой тег используется для создания гиперссылки?",
      question_en: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>",
      category: 'HTML',
      level: "easy"
    },
    {
      id: "css_mid_1",
      question_ru: "Какой селектор имеет самый высокий приоритет (специфичность)?",
      question_en: "Which selector has the highest specificity?",
      options: ["div.menu", "#header", "nav li", "div > p"],
      answer: "#header",
      category: "CSS & SCSS",
      level: "medium"
    },
    {
      id: "ts_1",
      question_ru: "Что такое TypeScript и чем он отличается от JavaScript?",
      question_en: "What is TypeScript and how is it different from JavaScript?",
      options: [
        "A superset of JavaScript with typing",
        "A new language unrelated to JS",
        "A framework for working with DOM",
        "A library for working with arrays"
      ],
      answer: "A superset of JavaScript with typing",
      answer_ru: "Язык надстройка над JavaScript с типизацией",
      answer_en: "A superset of JavaScript with typing",
      category: "JS & TS",
      level: "hard"
    }
  ]
  beforeEach(() => {
    QuestionsState.allQuestions = mockQuestions;
  });

  it("returns all questions when no filters provided", () => {
    const result = filterQuestions();

    expect(result).toEqual(mockQuestions);
    expect(result.length).toBe(3);
  });

  it("filters by category only", () => {
    const result = filterQuestions("HTML" as Category);

    expect(result).toEqual([
      mockQuestions[0],
    ]);
    expect(result.length).toBe(1);
  });

  it("filters by category only", () => {
    const result = filterQuestions("CSS & SCSS" as Category);

    expect(result).toEqual([
      mockQuestions[1],
    ]);
    expect(result.length).toBe(1);
  });

  it("filters by category only", () => {
    const result = filterQuestions("JS & TS" as Category);

    expect(result).toEqual([
      mockQuestions[2],
    ]);
    expect(result.length).toBe(1);
  });

  it("filters by level only", () => {
    const result = filterQuestions(undefined, "easy" as Level);

    expect(result).toEqual([
      mockQuestions[0]
    ]);
    expect(result.length).toBe(1);
  });

  it("filters by level only", () => {
    const result = filterQuestions(undefined, "medium" as Level);

    expect(result).toEqual([
      mockQuestions[1]
    ]);
    expect(result.length).toBe(1);
  });

  it("filters by level only", () => {
    const result = filterQuestions(undefined, "hard" as Level);

    expect(result).toEqual([
      mockQuestions[2]
    ]);
    expect(result.length).toBe(1);
  });

  it("filters by category and level", () => {
    const result = filterQuestions("HTML" as Category, "easy" as Level);

    expect(result).toEqual([
      mockQuestions[0],
    ]);
    expect(result.length).toBe(1);
  });

  it("returns empty array when no questions match", () => {
    const result = filterQuestions("HTML" as Category, "medium" as Level);

    expect(result).toEqual([]);
  });
});