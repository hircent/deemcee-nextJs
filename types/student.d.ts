import { StudentPaymentList } from "./payment";

export type StudentListFilterProps = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
};

export type StudentProps = {
  id: number;
  fullname: string;
  gender: string;
  dob: string;
  school: string;
  deemcee_starting_grade: string;
  status: string;
  start_date: string;
};

export type StudentFormErrors = {
  first_name?: string;
  last_name?: string;
  fullname?: string;
  gender?: string;
  dob?: string;
  school?: string;
  deemcee_starting_grade?: string;
  start_date?: string;
  parent?: string;
  parent_username?: string;
  parent_email?: string;
  status?: string;
};

export type DeleteFormErrors = {
  studentId?: string;
  id?: string;
  name?: string;
  confirmName?: string;
};

export interface Parent {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

export interface VideoAssignment {
  id: number;
  video_number: number;
  submission_date: string | null;
  submit_due_date: string;
}

export interface VideoAssignmentDetails {
  id: number;
  theme: string;
  video_number: number;
  video_url: string | null;
  submission_date: string | null;
  submit_due_date: string;
}

export type VideoAssignmentFormErrors = {
  student_id?: string;
  theme?: string;
  video_url?: string;
  submission_date?: string;
};

export type AdvanceEnrolmentError = {
  id?: string;
  grade?: string;
  is_early_advance?: boolean;
  start_date?: string;
  classroom?: string;
};

export interface Enrolment {
  id: number;
  start_date: string;
  end_date: string;
  day: string;
  status: string;
  remaining_lessons: number;
  is_active: boolean;
  freeze_lessons: number;
  grade: number;
  video_assignments: VideoAssignment[];
  extensions: number;
}

type PaymentStatus = {
  id: number;
  status: "PAID" | "PENDING" | "PARTIALLY_PAID" | "REFUNDED" | "VOIDED";
};

export interface EnrolmentData {
  id: number;
  student: {
    id: number;
    fullname: string;
  };
  grade: number;
  remaining_lessons: number;
  video_assignments: VideoAssignment[];
  payments: PaymentStatus;
}

export interface Payment {
  id: number;
  grade: number;
  status: string;
  term_fees: number;
  paid: number;
  outstanding: number;
}

interface StarterKitItem {
  value: string;
  label: string;
}

export interface StudentData {
  id: number;
  first_name: string;
  last_name: string | null;
  fullname: string;
  gender: string;
  dob: string;
  school: string;
  deemcee_starting_grade: number;
  status: string;
  enrolment_date: string;
  branch: string;
  parent?: Parent;
  enrolments?: Enrolment[];
  payments?: StudentPaymentList[];
  referral_channel: string | null;
  referral: string | null;
  starter_kits: StarterKitItem[];
}

export interface StudentCardProps {
  student: StudentData;
}

export type DeleteEnrolmentProps = {
  name: string;
  confirmName?: string;
  type: string;
  id: number;
  studentId: number;
};

export type ThemeLesson = {
  id: number;
  name: string;
  theme: string;
};

export type ClassLesson = {
  id: number;
  theme_lesson: ThemeLesson;
};

export type EnrolmentLessonProps = {
  id: number;
  class_lesson: ClassLesson;
  date: string;
  day: string;
  start_time: string;
  end_time: string;
  has_attended: boolean;
  status: "ABSENT" | "PRESENT"; // Add other possible status values if they exist
};

export type EnrolmentExtensionError = {
  id?: string;
  confirm?: string;
};
