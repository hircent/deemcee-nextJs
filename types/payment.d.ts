export type PaymentData = {
  id: number;
  status: string;
  amount: string;
  discount: string;
  paid_amount: string;
  pre_outstanding: string;
  post_outstanding: string;
  start_date: string;
  grade: number;
  student: string;
};

export type PaymentReportData = {
  id: number;
  student: string;
  grade: number;
  enrolment_type: string;
  paid_at: string;
  amount: number;
};

export type PaymentReportParams = {
  month?: number;
  year?: number;
};
