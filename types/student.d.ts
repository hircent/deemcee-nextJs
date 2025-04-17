import { StudentPaymentList } from "./payment";
import { ThemeData } from "./structure";

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
  parent_email?: string;
  parent_first_name?: string;
  parent_last_name?: string;
  parent_phone?: string;
  parent_dob?: string;
  status?: string;
};

export type EnrolmentFormErrors = {
  grade?: string;
  start_date?: string;
  classroom?: string;
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
  theme: ThemeData | null;
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

type EnrolmentExtensionDetails = {
  id: number;
  start_date: string;
  status: "PENDING" | "EXTENDED";
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
  extensions: {
    total: number;
    extension: EnrolmentExtensionDetails[];
  };
}

export type EnrolmentDetails = {
  id: number;
  grade: {
    id: number;
    grade_level: number;
    category: string;
  };
  tier: {
    id: number;
    name: string;
  };
  start_date: string;
  status: string;
  remaining_lessons: number;
  is_active: boolean;
  freeze_lessons: number;
};

type PaymentStatus = {
  id: number;
  status: "PAID" | "PENDING" | "PARTIALLY_PAID" | "REFUNDED" | "VOIDED";
  amount: string;
  paid_at: string | null;
};

export interface EnrolmentData {
  id: number;
  currency: string;
  student: {
    id: number;
    fullname: string;
  };
  start_date: string;
  end_date: string;
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
  enrolments: Enrolment[];
  payments: StudentPaymentList[];
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
  replacement: {
    date: string;
    status: "PENDING" | "ATTENDED" | "ABSENT";
  };
};

export type EnrolmentExtensionError = {
  id?: string;
  confirm?: string;
  start_date?: string;
};

export type UpdateEnrolmentError = {
  is_active?: string;
  grade_level?: string;
  status?: string;
  tier?: string;
};

export type StudentRemark = {
  fullname: string;
  remark: string;
};

export type StudentRemarkError = {
  remark?: string;
};
