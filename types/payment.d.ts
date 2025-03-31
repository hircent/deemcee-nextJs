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
  currency: string;
};

export type StudentPaymentList = PaymentData & {
  enrolment_type: string;
};

export type AttendanceInfo = {
  absent: number;
  freeze: number;
  sfreezed: number;
  replacement: number;
  enrolment: number;
  advance: number;
  extend: number;
};

export type StudentInfo = {
  total: number;
  in_progress: number;
  dropped_out: number;
  graduated: number;
};

export type PaymentReportData = {
  total_payments: number;
  payments: PaymentInfo[];
  student_info: StudentInfo;
  branch_info: {
    branch_grade: number;
    branch_percentage: number;
    currency: string;
  };
  attendances: AttendanceInfo;
  total_paid_amount: string;
  loyalty_fees: string;
};

type BranchTotalPayment = {
  id: number;
  name: string;
  total_amount: number;
  total_discount: number;
  discounted_amount: number;
  percentage: number;
  loyalty_fees: number;
};

export type HQAllBranchPaymentReportData = {
  attendances: AttendanceInfo;
  payments: BranchTotalPayment[];
  student_info: StudentInfo;
  total_amount: string;
  total_discount: string;
  discounted_amount: string;
  currency: string;
  loyalty_fees: string;
};

export type PaymentInfo = {
  id: number;
  student: string;
  grade: number;
  enrolment_type: string;
  paid_at: string;
  amount: number;
  discount: number;
  discounted_amount: number;
};

export type BranchPaymentInfo = {
  id: number;
  branch: string;
  total_active_students: number;
  total_fees: number;
  royalty: number;
};

export type PaymentReportParams = {
  month?: number;
  year?: number;
};

export type HQPaymentReportParams = PaymentReportParams & {
  country: string | undefined | string[];
};

export type MakePaymentFormErrors = {
  promo_code?: string;
  paid_amount?: string;
};
