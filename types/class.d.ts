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
  grade: number;
};
