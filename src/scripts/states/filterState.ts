import { Category, Level } from "../pages/quiz/quiz.types";

export interface CurrentFilter {
    category: Category;
    level: Level;
}

const defaultFilter: CurrentFilter = {
    category: 'JS & TS',
    level: 'medium'
};

let currentFilter: CurrentFilter = defaultFilter;

export function getCurrentFilter(): CurrentFilter {
    return currentFilter;
}

export function setCurrentFilter(filter: CurrentFilter): void {
    currentFilter = filter;
}

export function updateCurrentFilter(updates: Partial<CurrentFilter>): void {
    currentFilter = { ...currentFilter, ...updates };
}