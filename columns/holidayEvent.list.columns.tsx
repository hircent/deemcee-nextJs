"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarData } from "@/types/calendar";
import { extractDate } from "@/lib/utils";
import Actions from "@/components/Actions";

export const HolidayEventListColumns: ColumnDef<CalendarData>[] = [
  {
    id: "holidayNumber",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "entry_type",
    header: "Holiday Type",
  },
  {
    accessorKey: "start_datetime",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.original;
      return (
        <>
          <div>{extractDate(date.start_datetime)}</div>
        </>
      );
    },
  },
  {
    accessorKey: "end_datetime",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.original;
      return (
        <>
          <div>{extractDate(date.end_datetime)}</div>
        </>
      );
    },
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const calendar = row.original;

      return (
        <Actions id={+calendar.id} name={calendar.title} type="calendar" />
      );
    },
  },
];
