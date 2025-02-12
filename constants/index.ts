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

export const GRADE = [
  { id: 1, label: "Grade 1" },
  { id: 2, label: "Grade 2" },
  { id: 3, label: "Grade 3" },
  { id: 4, label: "Grade 4" },
  { id: 5, label: "Grade 5" },
  { id: 6, label: "Grade 6" },
];

export const StarterKitItems = [
  { label: "Student Booklet - G1", value: "14" },
  { label: "Student Booklet - G2", value: "15" },
  { label: "Student Booklet - G3", value: "16" },
  { label: "Student Booklet - G4", value: "17" },
  { label: "Student Booklet - G5", value: "18" },
  { label: "Student Booklet - G6", value: "19" },
  { label: "Student Uniform | Male - 36", value: "221" },
  { label: "Student Uniform | Male - 38", value: "222" },
  { label: "Student Uniform | Female - 36", value: "223" },
  { label: "Student Uniform | Female - 38", value: "225" },
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

export const STUDENT_FILTERTING_STATUSES = [
  { value: "IN_PROGRESS", label: "IN PROGRESS" },
  { value: "DROPPED_OUT", label: "DROPPED_OUT" },
  { value: "GRADUATED", label: "GRADUATED" },
];

export const AttendanceStatus = [
  {
    value: "ATTENDED",
    label: "Attended",
    className: "bg-gray-300 text-white hover:bg-green-600",
    isActive: "bg-green-600",
  },
  {
    value: "ABSENT",
    label: "Absent",
    className: "bg-gray-300 text-white hover:bg-red-600",
    isActive: "bg-red-600",
  },
  {
    value: "FREEZED",
    label: "Freeze",
    className: "bg-gray-300 text-white hover:bg-blue-600",
    isActive: "bg-blue-600",
  },
  {
    value: "SFREEZED",
    label: "S-Freeze",
    className: "bg-gray-300 text-white hover:bg-orange-600",
    isActive: "bg-orange-600",
  },
  {
    value: "REPLACEMENT",
    label: "Replacement",
    className: "bg-gray-300 text-white hover:bg-purple-600",
    isActive: "bg-purple-600",
  },
];

export const ReplacementAttendanceStatus = [
  {
    value: "ATTENDED",
    label: "Attended",
    className: "bg-gray-300 text-white hover:bg-green-600",
    isActive: "bg-green-600",
    isDisabled: false,
  },
  {
    value: "ABSENT",
    label: "Absent",
    className: "bg-gray-300 text-white hover:bg-red-600",
    isActive: "bg-red-600",
    isDisabled: false,
  },
  {
    value: "PENDING",
    label: "Pending",
    className: "bg-gray-300 text-white hover:bg-yellow-600",
    isActive: "bg-yellow-600",
    isDisabled: true,
  },
];
