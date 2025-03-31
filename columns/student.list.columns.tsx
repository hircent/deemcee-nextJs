"use client";
import { ColumnDef } from "@tanstack/react-table";
import { extractDate } from "@/lib/utils";
import { StudentProps } from "@/types/student";
import { DeleteStudent } from "@/components/DeleteStudent";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

export const StudentListColumns: ColumnDef<StudentProps>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "fullname",
    header: "Fullname",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "deemcee_starting_grade",
    header: "Starting Grade",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "enrolment_date",
    header: "Enrolment Date",
    cell: ({ row }) => {
      return extractDate(row.getValue("enrolment_date"));
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div className="flex gap-4 text-black-2">
          <Link
            className="group p-2 hover:bg-gray-100 rounded-full transition-colors"
            href={`/student/${student.id}`}
          >
            <EyeIcon
              size={18}
              className="text-gray-500 group-hover:text-blue-500 transition-colors"
            />
          </Link>
          <DeleteStudent
            type="student"
            name={student.fullname}
            id={student.id}
          />
        </div>
      );
    },
  },
];
