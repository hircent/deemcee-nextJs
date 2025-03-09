export type CertificateData = {
  id: number;
  student: {
    id: number;
    first_name: string;
    last_name: string;
    fullname: string;
  };
  grade: number;
  start_date: string;
  end_date: string;
  status: string;
  is_printed: boolean;
  branch: number;
};

export type CertificateParams = {
  isPrinted?: boolean;
  page?: number;
  q?: string;
};
