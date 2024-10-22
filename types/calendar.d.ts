export type CalendarData = {
  id: string;
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  year: number;
  month: number;
  entry_type: string;
  branch_id: number;
  created_at: string;
  updated_at: string;
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
