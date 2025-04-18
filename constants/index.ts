import * as LucideIcons from "lucide-react";
import { SectionNavLink } from "../types";

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    baseRoute: "/",
    label: "Home",
    icon: LucideIcons.LayoutDashboard,
    visible: ["superadmin", "principal", "manager"],
  },
  {
    imgURL: "/icons/home.svg",
    baseRoute: "/users",
    route: "/users/principal",
    label: "Users",
    icon: LucideIcons.Users,
    visible: ["superadmin", "principal", "manager"],
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
    baseRoute: "/structure",
    route: "/structure/category",
    label: "Structure",
    icon: LucideIcons.BookA,
    visible: ["superadmin"],
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
  {
    imgURL: "/icons/users.svg",
    baseRoute: "/deusers",
    route: "/deusers/parent",
    label: "DeUsers",
    icon: LucideIcons.User2,
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    imgURL: "/icons/users.svg",
    baseRoute: "/promocode",
    route: "/promocode/active",
    label: "Promo Code",
    icon: LucideIcons.Ticket,
    visible: ["superadmin"],
  },
  {
    imgURL: "/icons/users.svg",
    baseRoute: "/certificate",
    route: "/certificate/ready",
    label: "Certificate",
    icon: LucideIcons.Trophy,
    visible: ["superadmin"],
  },
  {
    imgURL: "/icons/users.svg",
    baseRoute: "/report",
    route: "/report",
    label: "Report",
    icon: LucideIcons.ChartBar,
    visible: ["superadmin", "principal"],
  },
];

export const StructureLinks: SectionNavLink[] = [
  {
    href: "/structure/category",
    label: "Category",
    visible: ["superadmin", "principal", "manager"],
  },
  {
    href: "/structure/theme",
    label: "Theme",
    visible: ["superadmin", "principal", "manager"],
  },
  {
    href: "/structure/grade",
    label: "Grade",
    visible: ["superadmin", "principal", "manager"],
  },
];

export const DeUsersLinks: SectionNavLink[] = [
  {
    href: "/deusers/parent",
    label: "Parents",
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    href: "/deusers/student",
    label: "Students",
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
  {
    href: "/deusers/enrolment",
    label: "Enrolments",
    visible: ["superadmin", "principal", "manager", "teacher"],
  },
];

export const ClassLinks: SectionNavLink[] = [
  {
    href: "/class",
    label: "Lesson Sequence",
    visible: ["superadmin", "principal", "manager"],
  },
  {
    href: "/class/attendance",
    label: "Attendance",
    visible: ["superadmin", "principal", "manager"],
  },
  {
    href: "/class/manage",
    label: "Manage Classes",
    visible: ["superadmin", "principal", "manager"],
  },
];

export const CertificateLinks: SectionNavLink[] = [
  {
    href: "/certificate/ready",
    label: "Ready to Print",
    visible: ["superadmin"],
  },
  { href: "/certificate/printed", label: "Printed", visible: ["superadmin"] },
];

export const PromocodeLinks: SectionNavLink[] = [
  { href: "/promocode/active", label: "Active Code", visible: ["superadmin"] },
  {
    href: "/promocode/inactive",
    label: "Inactive Code",
    visible: ["superadmin"],
  },
];

export const ReportLinks: SectionNavLink[] = [
  {
    href: `/report`,
    label: "Licensee Report",
    visible: ["superadmin", "principal", "manager"],
  },
  {
    href: `/report/hq`,
    label: "Licensee HQ Report",
    visible: ["superadmin"],
  },
  // {
  //   href: `/report/finance`,
  //   label: "Finance Report",
  //   visible: ["superadmin", "principal", "manager"],
  // },
  // {
  //   href: `/report/progression`,
  //   label: "Monthly Centre Progression",
  //   visible: ["superadmin", "principal", "manager"],
  // },
  // {
  //   href: `/report/referral`,
  //   label: "Referral Report",
  //   visible: ["superadmin", "principal", "manager"],
  // },
];

export const UserManagementLinks: SectionNavLink[] = [
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
  { href: "/users/superadmin", label: "Superadmin", visible: ["superadmin"] },
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
  "/deusers/enrolment",
  "/principal",
  "/manager",
  "/teacher",
  "/student",
  "/parent",
  "/certificate/ready",
  "/certificate/printed",
  "/report",
  "/report/finance",
  "/report/progression",
  "/report/referral",
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

export const MONTHS = [
  { id: 1, label: "January", value: "1" },
  { id: 2, label: "February", value: "2" },
  { id: 3, label: "March", value: "3" },
  { id: 4, label: "April", value: "4" },
  { id: 5, label: "May", value: "5" },
  { id: 6, label: "June", value: "6" },
  { id: 7, label: "July", value: "7" },
  { id: 8, label: "August", value: "8" },
  { id: 9, label: "September", value: "9" },
  { id: 10, label: "October", value: "10" },
  { id: 11, label: "November", value: "11" },
  { id: 12, label: "December", value: "12" },
];

export const REGIONS = [
  { id: 1, label: "Malaysia", value: "Malaysia" },
  { id: 2, label: "Australia", value: "Australia" },
];

export const BRANCH_GRADE = [
  { id: 1, label: "Level 1 (20%)", value: "1" },
  { id: 2, label: "Level 2 (15%)", value: "2" },
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

export const DAYS = [
  { id: 1, label: "Monday", value: "Monday" },
  { id: 2, label: "Tuesday", value: "Tuesday" },
  { id: 3, label: "Wednesday", value: "Wednesday" },
  { id: 4, label: "Thursday", value: "Thursday" },
  { id: 5, label: "Friday", value: "Friday" },
  { id: 6, label: "Saturday", value: "Saturday" },
  { id: 7, label: "Sunday", value: "Sunday" },
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

export const ENROLMENT_STATUS_CHOICES = [
  { value: "IN_PROGRESS", label: "IN PROGRESS" },
  { value: "COMPLETED", label: "COMPLETED" },
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

export const PROMO_TYPE = [
  { id: 1, value: "ENROLMENT", label: "Enrolment" },
  { id: 2, value: "MERCHANDISE", label: "Merchandise" },
  { id: 3, value: "OTHER", label: "Other" },
];
