"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ClassListData } from "@/types/class";
import { DeleteClass } from "@/components/DeleteClass";
import { EditClass } from "@/components/EditClass";

export const ClassListColumns: ColumnDef<ClassListData>[] = [
  {
    id: "ClassNumber",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "start_time",
    header: "Start Time",
  },
  {
    accessorKey: "end_time",
    header: "End Time",
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const classes = row.original;
      return (
        <div className="flex gap-4 text-black-2">
          <EditClass type={"class"} id={classes.id} />
          <DeleteClass type={"class"} name={classes.label} id={classes.id} />
        </div>
      );
    },
  },
];
