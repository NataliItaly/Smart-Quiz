import { Category, Level } from "../pages/quiz/quiz.types";

export function toCategory(value: string): Category | undefined {
  return value ? (value as Category) : undefined;
}

export function toLevel(value: string): Level | undefined {
  return value ? (value as Level) : undefined;
}