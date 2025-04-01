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
  display_name: string;
};

export type ClassFormErrors = {
  name?: string;
  label?: string;
  start_date?: string;
  start_time?: string;
  end_time?: string;
  day?: string;
};

export type RescheduleFormErrors = {
  classroom?: string;
};

export type GetTimeslotProps =
  | { date: string; grade: number; categoryName?: never }
  | { date: string; categoryName: string; grade?: never };

export type GetClassSlotProps = {
  date: string;
  category: string;
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

type ReplamentClassInfo = {
  id: number;
  label: string;
  date: string;
  status: "PENDING" | "ATTENDED" | "ABSENT";
  replacement_for_lesson: string;
};

type MarkedClassEnrolmentBase = {
  id: number;
  enrollment: Enrolment;
};

type AttendedEnrolment = MarkedClassEnrolmentBase & {
  status: "ATTENDED";
};

type AbsentEnrolment = MarkedClassEnrolmentBase & {
  status: "ABSENT";
};

type FreezeEnrolment = MarkedClassEnrolmentBase & {
  status: "FREEZE";
};

type ReplacementEnrolment = MarkedClassEnrolmentBase & {
  status: "REPLACEMENT";
  replacement_class_info: ReplamentClassInfo;
};

export type MarkedClassEnrolment =
  | AttendedEnrolment
  | AbsentEnrolment
  | FreezeEnrolment
  | ReplacementEnrolment;

type ReplacementStudentLesson = Enrolment & {
  is_active: boolean;
  status: "PENDING" | "ATTENDED" | "ABSENT";
  remaining_lessons: number;
  replacement_for_lesson: string;
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
  student_attendances?: MarkedClassEnrolment[];
  unmarked_enrolments?: UnmarkedClassEnrolment[];
  replacement_students?: ReplacementStudentLesson[];
};

export interface ClassAttendanceFormProps {
  classData: ClassLessonTodayStudentList;
  teacherList: TeachingUserList[];
  isFutureDate: boolean;
  calendarThemeLessonList: CalendarThemeLesson[];
}
