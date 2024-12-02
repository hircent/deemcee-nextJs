import {
  LayoutDashboard,
  Calendar,
  Home,
  User2,
  Users,
  BookA,
  BookOpenText,
} from "lucide-react";

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
    icon: LayoutDashboard,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/users",
    label: "Users",
    icon: Users,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/branch",
    label: "Branch",
    icon: Home,
    visible: ["superadmin", "principal", "manager"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/structure",
    label: "Structure",
    icon: BookA,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/class",
    label: "Classes",
    icon: BookOpenText,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/superadmin",
    label: "Superadmin",
    icon: User2,
    visible: ["superadmin"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/principal",
    label: "Principal",
    icon: User2,
    visible: ["superadmin", "principal"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/manager",
    label: "Manager",
    icon: User2,
    visible: ["superadmin", "principal", "manager"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/teacher",
    label: "Teacher",
    icon: User2,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/parent",
    label: "Parent",
    icon: User2,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/student",
    label: "Student",
    icon: User2,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/calendar",
    label: "Calendar",
    icon: Calendar,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
];

export const StructureLinks = [
  { href: "/structure", label: "Main" },
  { href: "/structure/category", label: "Category" },
  { href: "/structure/grade", label: "Grade" },
  { href: "/structure/theme", label: "Theme" },
];

export const ClassLinks = [
  { href: "/class", label: "Timetable" },
  { href: "/class/attendance", label: "Attendance" },
  { href: "/class/manage", label: "Manage Classes" },
];

export const UserManagementLinks = [
  {
    href: "/users",
    label: "Main",
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  { href: "/users/superadmin", label: "Superadmin", visible: ["superadmin"] },
  {
    href: "/users/principal",
    label: "Principal",
    visible: ["superadmin", "principal"],
  },
  {
    href: "/users/manager",
    label: "Manager",
    visible: ["superadmin", "principal", "manager"],
  },
  {
    href: "/users/teacher",
    label: "Teacher",
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
];

export const IsSuperadmin = ["superadmin"];

export const IsPrincipalOrHigher = ["superadmin", "principal"];

export const IsManagerOrHigher = ["superadmin", "principal", "manager"];

export const branchSelectorPermission = [
  "/users/principal",
  "/users/manager",
  "/users/teacher",
  "/calendar",
  "/class",
  "/principal",
  "/manager",
  "/teacher",
  "/student",
  "/parent",
];

export const SERVER_ACTION_STATE = {
  zodErr: null,
  success: null,
  error: null,
  msg: "",
};
// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Travel: {
    borderColor: "border-[#0047AB]",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};
