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

export type PaymentReportData = {
  total_payments: number;
  payments: PaymentInfo[];
  student_info: {
    total: number;
    in_progress: number;
    dropped_out: number;
    graduated: number;
  };
  branch_info: {
    branch_grade: number;
    branch_percentage: number;
    currency: string;
  };
  attendances: {
    absent: number;
    freeze: number;
    sfreezed: number;
    replacement: number;
  };
  total_paid_amount: string;
  loyalty_fees: string;
};

export type PaymentInfo = {
  id: number;
  student: string;
  grade: number;
  enrolment_type: string;
  paid_at: string;
  amount: number;
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
