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
  enrolment_date: string;
};

export type StudentFormErrors = {
  first_name?: string;
  last_name?: string;
  fullname?: string;
  gender?: string;
  dob?: string;
  school?: string;
  deemcee_starting_grade?: string;
  enrolment_date?: string;
  parent?: string;
};

export interface Parent {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

export interface Enrolment {
  id: number;
  start_date: string;
  status: string;
  remaining_lessons: number;
  is_active: boolean;
  freeze_lessons: number;
  grade: number;
}

export interface Payment {
  id: number;
  grade: number;
  status: string;
  term_fees: number;
  paid: number;
  outstanding: number;
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
  branch: number;
  parent?: Parent;
  enrolments?: Enrolment[];
  payment?: Payment[];
}

export interface StudentCardProps {
  student: StudentData;
}
