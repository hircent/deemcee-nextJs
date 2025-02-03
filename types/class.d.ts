import { CalendarThemeLesson } from "@/types/calendar";

export type ClassListData = {
  id: number;
  branch: number;
  name: string;
  label: string;
  start_date: string;
  start_time: string;
  end_time: string;
  day: string;
};

export type ClassData = {
  id: number;
  name: string;
  label: string;
  start_time: string;
  end_time: string;
  day: string;
};

export type ClassFormErrors = {
  name?: string;
  label?: string;
  start_date?: string;
  start_time?: string;
  end_time?: string;
  day?: string;
};

export type GetTimeslotProps = {
  date: string;
  grade?: number;
  categoryName?: string;
};

export type EnrolmentStudent = {
  id: number;
  fullname: string;
};

export type Enrolment = {
  id: number;
  student: EnrolmentStudent;
};

export type UnmarkedClassEnrolment = {
  id: number;
  student: EnrolmentStudent;
  is_active: boolean;
  remaining_lessons: number;
};

export type MarkedClassEnrolment = {
  id: number;
  enrollment: Enrolment;
  status: string;
};

export type ClassLessonTodayStudentList = {
  id: number;
  branch: number;
  class_instance: ClassData;
  teacher: number | null;
  co_teacher: number | null;
  theme_lesson: number | null;
  date: string;
  status: "Pending" | "Completed";
  student_attendances: MarkedClassEnrolment[];
  unmarked_students: UnmarkedClassEnrolment[];
};

export interface ClassAttendanceFormProps {
  classData: ClassLessonTodayStudentList;
  teacherList: TeachingUserList[];
  classIndex: number;
  calendarThemeLessonList: CalendarThemeLesson[];
}
