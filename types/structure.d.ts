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

export type ThemeData = {
  id: number;
  name: string;
  category: string;
  year: number;
};

export type CategoryFormErrors = {
  name?: string;
  label?: string;
  year?: string;
  is_active?: boolean;
};
