"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EnrolmentData } from "@/types/student";
import { DeleteStudent } from "@/components/DeleteStudent";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import EditVideoAssignment from "@/components/EditVideoAssignment";
import { getCategoryByGrade } from "@/lib/utils";

export const EnrolmentListColumns: ColumnDef<EnrolmentData>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "fullname",
    header: "Fullname",
    cell: ({ row }) => {
      return row.original.student.fullname;
    },
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "remaining_lessons",
    header: "Remaining Lessons",
  },
  {
    accessorKey: "video_assignments",
    header: "Video Assignments",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex flex-col gap-2">
          {student.video_assignments.map((video) => (
            <EditVideoAssignment
              key={video.video_number}
              video={video}
              student_id={student.id}
              category={getCategoryByGrade(student.grade)}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "payments",
    header: "Payments",
    cell: ({ row }) => {
      return "Payments";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const original = row.original;

      return (
        <div className="flex gap-4 text-black-2">
          <Link
            className="group p-2 hover:bg-gray-100 rounded-full transition-colors"
            href={`/student/${original.student.id}`}
          >
            <EyeIcon
              size={18}
              className="text-gray-500 group-hover:text-blue-500 transition-colors"
            />
          </Link>
          {/* <DeleteStudent
            type="student"
            name={original.student.fullname}
            id={original.student.id}
          /> */}
        </div>
      );
    },
  },
];
