import * as LucideIcons from "lucide-react";

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    baseRoute: "/",
    label: "Home",
    icon: LucideIcons.LayoutDashboard,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/users",
    baseRoute: "/users",
    label: "Users",
    icon: LucideIcons.Users,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/branch",
    baseRoute: "/branch",
    label: "Branch",
    icon: LucideIcons.Home,
    visible: ["superadmin", "principal", "manager"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/structure",
    baseRoute: "/structure",
    label: "Structure",
    icon: LucideIcons.BookA,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/class",
    baseRoute: "/class",
    label: "Classes",
    icon: LucideIcons.BookOpenText,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/users.svg",
    route: "/calendar",
    baseRoute: "/calendar",
    label: "Calendar",
    icon: LucideIcons.Calendar,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  // {
  //   imgURL: "/icons/users.svg",
  //   route: "/parent",
  //   label: "Parent",
  //   icon: LucideIcons.User2,
  //   visible: ["superadmin", "principal", "manager", "teacher"],
  // },
  // {
  //   imgURL: "/icons/users.svg",
  //   route: "/student",
  //   label: "Student",
  //   icon: LucideIcons.User2,
  //   visible: ["superadmin", "principal", "manager", "teacher"],
  // },
  {
    imgURL: "/icons/users.svg",
    baseRoute: "/deusers",
    route: "/deusers/parent",
    label: "DeUsers",
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

export const DeUsersLinks = [
  { href: "/deusers/parent", label: "Parents" },
  { href: "/deusers/student", label: "Students" },
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
  "/deusers",
  "/deusers/parent",
  "/deusers/student",
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

export const StarterKitItems = [
  { label: "Book1", value: "Book1" },
  { label: "Book2", value: "Book2" },
  { label: "Shirt1", value: "Shirt1" },
  { label: "Shirt2", value: "Shirt2" },
  { label: "Bag1", value: "Bag1" },
  { label: "Bag2", value: "Bag2" },
];

export const ReferralChannels = [
  "Facebook",
  "Google Form",
  "Centre FB Page",
  "DeEmcee Referral",
  "External Referral",
  "Call In",
  "Others",
];
