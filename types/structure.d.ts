export type CategoryData = {
  id: number;
  name: string;
  label: string;
  year: number;
  is_active: boolean;
};

export type GradeData = {
  id: number;
  grade_level: number;
  category: string;
  price: number;
};

export type GradeDataErrors = {
  grade_level?: number;
  category?: string;
  price?: number;
};

export type ThemeData = {
  id: number;
  name: string;
  order: number;
  category: string;
  year: number;
};

export type ThemeLesson = {
  id: number;
  name: string;
  order: number;
};

export type ThemeDetails = {
  id: number;
  name: string;
  category: number;
  lessons: ThemeLesson[];
};

export type ThemeDetailsError = {
  name?: string;
  category?: string;
  lesson_1?: string;
  lesson_2?: string;
  lesson_3?: string;
  lesson_4?: string;
};

export type CategoryFormErrors = {
  name?: string;
  label?: string;
  year?: string;
  is_active?: boolean;
};
