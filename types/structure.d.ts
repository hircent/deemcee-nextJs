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
  category: string;
  year: number;
};

export type ThemeDetails = {
  id: number;
  name: string;
  category: number;
  lessons:{
    id: number;
    title: string;
    lesson_one: string;
    lesson_two: string;
    lesson_three: string;
    lesson_four: string;
  }
}

export type ThemeDetailsError = {
  name?: string;
  category?: string;
  lesson_one?: string;
  lesson_two?: string;
  lesson_three?: string;
  lesson_four?: string;
  
}

export type CategoryFormErrors = {
  name?: string;
  label?: string;
  year?: string;
  is_active?: boolean;
};
