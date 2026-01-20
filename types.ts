export enum Topic {
  CLEAN_CODE = 'Clean Code Principles',
  DESIGN_PATTERNS = 'Design Patterns (GoF)',
  REFACTORING = 'Refactoring Techniques',
  ARCHITECTURE = 'Software Architecture',
  SOLID = 'SOLID Principles',
  REACT_PATTERNS = 'Advanced React Patterns',
  ANGULAR = 'Angular Core & Signals',
  TYPESCRIPT = 'TypeScript Advanced'
}

export enum LanguageMode {
  ENG = 'English Only',
  MM = 'Myanmar Only',
  BOTH = 'Bilingual'
}

export interface FlashcardData {
  title: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
  scenario_eng: string;
  scenario_mm: string;
  question_eng: string;
  question_mm: string;
  code_snippet_initial?: string; // The "bad" or "before" code
  solution_eng: string;
  solution_mm: string;
  code_snippet_solution?: string; // The "clean" or "after" code
  key_takeaway_eng: string;
  key_takeaway_mm: string;
}

export interface AppState {
  currentCard: FlashcardData | null;
  history: FlashcardData[];
  loading: boolean;
  topic: Topic;
  languageMode: LanguageMode;
  isFlipped: boolean;
  error: string | null;
}