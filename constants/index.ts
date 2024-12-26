import * as LucideIcons from "lucide-react";

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
    icon: LucideIcons.LayoutDashboard,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/users",
    label: "Users",
    icon: LucideIcons.Users,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/branch",
    label: "Branch",
    icon: LucideIcons.Home,
    visible: ["superadmin", "principal", "manager"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/structure",
    label: "Structure",
    icon: LucideIcons.BookA,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/class",
    label: "Classes",
    icon: LucideIcons.BookOpenText,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/calendar",
    label: "Calendar",
    icon: LucideIcons.Calendar,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  // {
  //   imgURL: "/icons/users.svg",
  //   route: "/superadmin",
  //   label: "Superadmin",
  //   icon: User2,
  //   visible: ["superadmin"],
  // },
  // {
  //   imgURL: "/icons/users.svg",
  //   route: "/principal",
  //   label: "Principal",
  //   icon: User2,
  //   visible: ["superadmin", "principal"],
  // },
  // {
  //   imgURL: "/icons/users.svg",
  //   route: "/manager",
  //   label: "Manager",
  //   icon: User2,
  //   visible: ["superadmin", "principal", "manager"],
  // },
  // {
  //   imgURL: "/icons/users.svg",
  //   route: "/teacher",
  //   label: "Teacher",
  //   icon: User2,
  //   visible: ["superadmin", "principal", "manager", "teacher"],
  // },
  {
    imgURL: "/icons/users.svg",
    route: "/parent",
    label: "Parent",
    icon: LucideIcons.User2,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/student",
    label: "Student",
    icon: LucideIcons.User2,
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
  "/class/attendance",
  "/class/manage",
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
export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const CLASS_TYPES = [
  { value: "Kids", label: "Kids" },
  { value: "Kiddo", label: "Kiddo" },
  { value: "Superkids", label: "Superkids" },
];
