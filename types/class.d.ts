export type ClassListData = {
  id: number;
  branch: number;
  label: string;
  start_date: string;
  start_datetime: string;
  start_time: string;
  end_time: string;
  day: number;
};

export type ClassFormErrors = {
  name?: string;
  label?: string;
  start_date?: string;
  start_time?: string;
  end_time?: string;
  day?: string;
};
