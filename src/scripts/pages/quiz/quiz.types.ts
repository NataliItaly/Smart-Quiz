export type Category = 'HTML' | 'CSS & SCSS' | 'JS & TS';
export type Level = 'easy' | 'medium' | 'hard';


export type QuizData = Record<Category, Record<Level, Question[]>>;

export interface QuizResponse {
  quiz: QuizData
}

export interface QuizFilter {
  category: Category;
  level: Level;
}

export interface FilterOptions {
  category: string[];
  level: string[];
}

export interface Question {
  id: string | number;
  question_ru: string;
  question_en: string;
  options: string[];
  options_ru?: string[];
  options_en?: string[];
  answer: string;
  answer_ru?: string;
  answer_en?: string;
  category: Category;
  level: Level;
}