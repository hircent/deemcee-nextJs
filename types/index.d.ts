/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

// declare type User = {
//   $id: string;
//   email: string;
//   userId: string;
//   // dwollaCustomerUrl: string;
//   // dwollaCustomerId: string;
//   firstName: string;
//   lastName: string;
//   // name: string;
//   // address1: string;
//   // city: string;
//   // state: string;
//   // postalCode: string;
//   // dateOfBirth: string;
//   // ssn: string;
// };

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  shareableId: string;
};

declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  shareableId: string;
};

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan "
  | "investment"
  | "other";

declare type Category = "Food and Drink" | "Travel" | "Transfer";

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare type Receiver = {
  firstName: string;
  lastName: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface BankInfoProps {
  account: Account;
  appwriteItemId?: string;
  type: "full" | "card";
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user: User;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface BankDropdownProps {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
}

declare interface BankTabItemProps {
  account: Account;
  appwriteItemId?: string;
}

declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

declare interface SiderbarProps {
  user: User;
}

declare interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface CategoryBadgeProps {
  category: string;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface CategoryProps {
  category: CategoryCount;
}

declare interface DoughnutChartProps {
  accounts: Account[];
}

declare interface PaymentTransferFormProps {
  accounts: Account[];
}

// Actions
declare interface getAccountsProps {
  userId: string;
}

declare interface getAccountProps {
  appwriteItemId: string;
}

declare interface getInstitutionProps {
  institutionId: string;
}

declare interface getTransactionsProps {
  accessToken: string;
}

declare interface userTokenProp {
  accessToken: string;
}

declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

declare interface getTransactionsByBankIdProps {
  bankId: string;
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
  userId: string;
}

declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}

declare interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}

declare interface getBanksProps {
  userId: string;
}

declare interface getBankProps {
  documentId: string;
}

declare interface getBankByAccountIdProps {
  accountId: string;
}

declare interface signInResponse {
  success: boolean;
  msg: string;
  data: User | undefined;
}

export type BranchRole = {
  branch_id: number;
  branch_name: string;
  branch_role: string;
};

export type User = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  branch_role: BranchRole[];
};

export type UserContextProps = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

export type BranchProps = {
  id: number;
  branch_grade: number;
  name: string;
  display_name: string;
  business_reg_no: string;
  operation_date: string;
};

export type TypeUserProps = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: string;
  created_at: string;
  updated_at: string;
};

export type TypeUserDetailsProps = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: string;
  created_at: string;
  updated_at: string;
  details: string;
  address: Address;
};

export type UserAddress = {
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  city: string;
  postcode: string;
  state: string;
};

export type UserDetails = {
  gender: string;
  dob: string;
  ic_number: string;
  occupation: string;
  spouse_name: string;
  spouse_phone: string;
  spouse_occupation: string;
  no_of_children: string;
  personal_email: string;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
};

export type UserFullDetailsData = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  details: UserDetails;
  address: UserAddress;
  user_branch_roles: BranchRole[];
};

export type ListProps<T> = {
  success: boolean;
  total: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  data: T[];
};

export interface PaginationProps {
  next: string | null;
  previous: string | null;
  baseUrl: string;
}

export type BranchListFilterProps = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};

export type SearchParamsFilterProps = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};

export type UserListFilterProps = {
  type: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
};

export type SUPERADMIN = "superadmin";
export type BRANCH = "branch";
export type PRINCIPAL = "principal";
export type MANAGER = "manager";
export type TEACHER = "teacher";
export type STUDENT = "student";
export type PARENT = "parent";

export type DeleteProps = {
  type: BRANCH | PRINCIPAL | MANAGER | TEACHER | STUDENT | SUPERADMIN | PARENT;
  name: string;
  id: number;
};

export type EditProps = {
  type: string;
  id: number;
};

export type DeleteBranchProps = {
  name: string;
  confirmName: string;
  id: number;
};

export type DeleteCalendarProps = {
  name: string;
  confirmName?: string;
  type: string;
  id: number;
};

export type DeleteClassProps = {
  name: string;
  confirmName?: string;
  type: string;
  id: number;
};

export type DeleteUserProps = {
  type: string;
  name: string;
  confirmName: string;
  id: number;
};

export type DeleteActionProps = {
  type: string;
  name: string;
  id: number;
};

export type GetBranchDetailProps = {
  id: number;
};

export type GetUserDetailProps = {
  id: number;
};
export type UpdateUserDetailProps = {
  id: number;
  type: string;
  formData: CreateUserFormValues;
};

export type Address = {
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  city: string;
  postcode: string;
  state: string;
  created_at: string;
  updated_at: string;
};

export type BranchDetailProps = {
  principal: {
    id: number;
    username: string;
  };
  branch_grade: {
    id: number;
    name: string;
  };
  address: Address;
  branch_grade: number;
  business_name: string;
  business_reg_no: string;
  description: string;
  display_name: string;
  id: number;
  is_headquaters: string;
  name: string;
  operation_date: string;
  updated_at: string;
  created_at: string;
  terminated_at: string;
};

export type Principal = {
  id: number;
  username: string;
};

export type BranchGrade = {
  id: number;
  name: string;
};

export type BranchSelectorProps = {
  id: number;
  name: string;
};

export type PrincipalsAndBranchGrade = {
  principals: Principal[];
  branch_grades: BranchGrade[];
};

export type CreateType = {
  type: string;
};

export type STATE<T> = {
  zodErr?: T | null;
  success?: boolean | null;
  error?: boolean | null;
  msg?: string;
};

export type SectionNavLink = {
  href: string;
  label: string;
};
