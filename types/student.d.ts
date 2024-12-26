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
