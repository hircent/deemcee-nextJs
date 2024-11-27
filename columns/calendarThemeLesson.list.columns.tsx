"use client";
import { ColumnDef } from "@tanstack/react-table";
import { GroupedLesson } from "@/types/calendar";
import { extractDate } from "@/lib/utils";

export const CalendarThemeLessonListColumns: ColumnDef<GroupedLesson>[] = [
  {
    id: "holidayNumber",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "lesson_date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original;
      return (
        <>
          <div>{extractDate(date.date)}</div>
        </>
      );
    },
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "theme_lesson_kiddo",
    header: "Kiddo",
  },
  {
    accessorKey: "theme_lesson_kids",
    header: "KIDS",
  },
  {
    accessorKey: "theme_lesson_superkids",
    header: "SUPERKIDS",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
];
