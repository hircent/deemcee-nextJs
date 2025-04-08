"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EnrolmentData } from "@/types/student";
import Link from "next/link";
import { CheckCircle, EyeIcon } from "lucide-react";
import EditVideoAssignment from "@/components/EditVideoAssignment";
import { getCategoryByGrade } from "@/lib/utils";
import MakePayment from "@/components/MakePayment";
import { EditNote } from "@/components/EditNote";

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
      const student = row.original;
      return (
        <div className="flex gap-2 items-center">
          {student.student.fullname}
          <div>
            <EditNote id={student.student.id} name={student.student.fullname} />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "remaining_lessons",
    header: "Remaining Lessons",
  },
  {
    accessorKey: "amount",
    header: "Fees",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div>
          {payment.currency} {payment.payments.amount}
        </div>
      );
    },
  },
  {
    accessorKey: "paid_at",
    header: "Paid At",
    cell: ({ row }) => {
      const payment = row.original;
      return <div>{payment.payments.paid_at || "Due Immediately"}</div>;
    },
  },
  {
    accessorKey: "payments",
    header: "Payments",
    cell: ({ row }) => {
      const payment = row.original.payments;
      return (
        <div className="flex flex-col gap-2">
          {payment.status === "PAID" && (
            <div className="flex gap-2 text-green-500">
              <CheckCircle size={18} />
              <span>Paid</span>
            </div>
          )}
          {payment.status === "PENDING" && <MakePayment id={payment.id} />}
        </div>
      );
    },
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
        </div>
      );
    },
  },
];
