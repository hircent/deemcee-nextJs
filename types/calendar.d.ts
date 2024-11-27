export type CalendarData = {
  id: string;
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  year: string;
  month: number;
  entry_type: string;
  branch_id: number;
  created_at: string;
  updated_at: string;
};

type ThemeLesson = {
  id: number;
  name: string;
  order: number;
};

export type CalendarThemeLesson = {
  id: number;
  theme_lesson: ThemeLesson[];
  theme: {
    id: number;
    name: string;
  }[];
  category: string;
  branch: number;
  lesson_date: string;
  day: string;
  month: number;
  year: number;
};

export type GetCalendarProp = {
  year?: string;
};

export type ProcessedCalendarEvent = {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: {
    description: string;
    entry_type: string;
  };
};

export type HolidayEventError = {
  title?: string[];
  description?: string[];
  entry_type?: string[];
  start_datetime?: string[];
  end_datetime?: string[];
  name?: string[];
};

export type LessonData = {
  id: number;
  theme_lesson: ThemeLesson;
  theme: {
    id: number;
    name: string;
  };
  category: "KIDS" | "KIDDO" | "SUPERKIDS";
  branch: number;
  lesson_date: string;
  day: string;
  month: number;
  year: number;
};

export type GroupedLesson = {
  date: string;
  month: number;
  year: number;
  day: string;
  theme_lesson_kids: string | null;
  theme_lesson_kiddo: string | null;
  theme_lesson_superkids: string | null;
};
