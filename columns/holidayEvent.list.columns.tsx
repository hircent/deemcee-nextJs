"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end" className="bg-white">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem className="hover:bg-slate-400 cursor-pointer">
        //       <EditBranch type={"branch"} id={branch.id} />
        //       Edit
        //     </DropdownMenuItem>
        //     <DropdownMenuItem className="hover:bg-slate-400 cursor-pointer">
        //       <DeleteBranch type={"branch"} name={branch.name} id={branch.id} />
        //       Delete
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <Actions id={+calendar.id} name={calendar.title} type="calendar"/>
      );
    },
  },
];
