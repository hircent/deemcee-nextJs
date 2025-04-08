/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { BranchRole, User } from "../types";
import { CalendarData, GroupedLesson, LessonData } from "@/types/calendar";
import { EventInput } from "@fullcalendar/core/index.js";
import {
  IsSuperadmin,
  IsPrincipalOrHigher,
  IsManagerOrHigher,
} from "@/constants/index";
import {
  SUPERADMIN,
  PARENT,
  TEACHER,
  PRINCIPAL,
  MANAGER,
} from "@/constants/message";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dayLongOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDateDayLong: string = new Date(dateString).toLocaleString(
    "en-US",
    dayLongOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateDayLong: formattedDateDayLong,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

// Generate an array of years (last 5 years to next 5 years)
export const generateYearRange = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 11 }, (_, i) => (currentYear - 5 + i).toString());
};

interface removeKeysParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: removeKeysParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state:
      type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
    postalCode:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
    // both
    email: z.string().email(),
    password: z.string().min(8),
  });

export const getUserBranches = (user: User) => {
  return user.branch_role.map((branch) => branch.branch_id);
};

export const getUserRole = (user: User | undefined): string[] => {
  if (!user || !user.branch_role) return [];
  return user.branch_role.map((branch) => branch.branch_role);
};

export const getBranchCountry = (
  id: number,
  branchRole: BranchRole[]
): string => {
  return branchRole.find((br) => br.branch_id === id)!.country;
};
export const camelCase = (word: string) => {
  const firstLetterUppercase = word.charAt(0).toUpperCase() + word.slice(1);
  return firstLetterUppercase;
};

export function extractDate(isoTimestamp: string | undefined): string {
  // Split the string at 'T' to separate the date and time
  if (isoTimestamp) {
    const [date] = isoTimestamp.split("T");
    return date;
  }
  return "";
}

export function processCalendarData(data: CalendarData[]): EventInput[] {
  return data.map((event) => {
    const colors = getEventColor(event.entry_type);
    return {
      title: event.title,
      start: event.start_datetime,
      end: event.end_datetime,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      textColor: colors.textColor,
      extendedProps: {
        description: event.description,
        entry_type: event.entry_type,
      },
    };
  });
}

function getEventColor(entryType: string): {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
} {
  switch (entryType.toLowerCase()) {
    case "centre holiday":
      return {
        backgroundColor: "#FDE68A", // Soft yellow
        borderColor: "#F59E0B", // Darker yellow
        textColor: "#92400E", // Dark brown
      };
    case "public holiday":
      return {
        backgroundColor: "#BBF7D0", // Soft green
        borderColor: "#22C55E", // Darker green
        textColor: "#166534", // Dark green
      };
    case "event":
      return {
        backgroundColor: "#BFDBFE", // Soft blue
        borderColor: "#3B82F6", // Darker blue
        textColor: "#1E40AF", // Dark blue
      };
    default:
      return {
        backgroundColor: "#FDA4AF", // Soft pink
        borderColor: "#F43F5E", // Darker pink
        textColor: "#9F1239", // Dark pink
      };
  }
}

export function filterCalendarEvents(calendarData: CalendarData[]) {
  const holidayEvents: CalendarData[] = [];
  const eventList: CalendarData[] = [];
  const otherEvents: CalendarData[] = [];

  calendarData.forEach((event) => {
    switch (event.entry_type.toLowerCase()) {
      case "centre holiday":
      case "public holiday":
        holidayEvents.push(event);
        break;
      case "event":
        eventList.push(event);
        break;
      case "other":
      default:
        otherEvents.push(event);
        break;
    }
  });

  return { holidayEvents, eventList, otherEvents };
}

function groupLessonsByDate(data: LessonData[]): GroupedLesson[] {
  const groupedLessons: Record<string, GroupedLesson> = {};

  data.forEach((lesson) => {
    const dateKey = lesson.lesson_date;

    // Initialize the date entry if it doesn't exist
    if (!groupedLessons[dateKey]) {
      groupedLessons[dateKey] = {
        date: lesson.lesson_date,
        month: lesson.month,
        year: lesson.year,
        day: lesson.day,
        theme_lesson_kids: null,
        theme_lesson_kiddo: null,
        theme_lesson_superkids: null,
      };
    }

    // Assign theme lessons based on category
    switch (lesson.category) {
      case "Kids":
        groupedLessons[dateKey].theme_lesson_kids =
          lesson.theme_lesson.name + " - (" + lesson.theme.name + ")";
        break;
      case "Kiddo":
        groupedLessons[dateKey].theme_lesson_kiddo =
          lesson.theme_lesson.name + " - (" + lesson.theme.name + ")";
        break;
      case "Superkids":
        groupedLessons[dateKey].theme_lesson_superkids =
          lesson.theme_lesson.name + " - (" + lesson.theme.name + ")";
        break;
    }
  });

  // Convert the object to an array and return
  return Object.values(groupedLessons);
}

// Example usage
export function processLessonData(data: LessonData[]): GroupedLesson[] {
  return groupLessonsByDate(data);
}

export function getUserRoleAndUserType(pathname: string): {
  role: string[] | undefined;
  type: string | undefined;
} {
  switch (pathname) {
    case "/users/superadmin":
      return { role: IsSuperadmin, type: SUPERADMIN };
    case "/users/principal":
      return { role: IsPrincipalOrHigher, type: PRINCIPAL };
    case "/users/manager":
      return { role: IsManagerOrHigher, type: MANAGER };
    case "/users/teacher":
      return { role: IsManagerOrHigher, type: TEACHER };
    case "/users/parent":
      return { role: IsManagerOrHigher, type: PARENT };
    default:
      return { role: undefined, type: undefined };
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "ATTENDED":
    case "IN_PROGRESS":
      return "bg-green-100 text-green-800";
    case "GRADUATED":
      return "bg-blue-100 text-blue-800";
    case "DROPPED_OUT":
    case "ABSENT":
      return "bg-red-100 text-red-800";
    case "FREEZED":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getEmbedUrl = (url: string | null): string | undefined => {
  if (!url) return undefined;

  try {
    // Handle YouTube URLs
    if (url.includes("youtu.be") || url.includes("youtube.com")) {
      let videoId = "";
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1];
      } else if (url.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get("v") || "";
      }
      if (videoId) {
        // Remove any additional parameters
        videoId = videoId.split("?")[0];
        videoId = videoId.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Handle Facebook URLs
    if (url.includes("facebook.com")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=false`;
    }

    return url;
  } catch (error) {
    console.error("Error processing video URL:", error);
    return undefined; // Changed from null to undefined
  }
};

export function getCategoryByGrade(grade: number): string {
  switch (grade) {
    case 1:
    case 2:
      return "Kiddo";
    case 3:
    case 4:
      return "Kids";
    case 5:
    case 6:
      return "Superkids";
    default:
      return "Superkids";
  }
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function dateIsBeforeToday(date: string): boolean {
  return new Date(date).getTime() < new Date().setHours(0, 0, 0, 0);
}
