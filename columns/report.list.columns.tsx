"use client";
import { ColumnDef } from "@tanstack/react-table";
import { extractDate } from "@/lib/utils";
import { PaymentInfo } from "@/types/payment";

export const PaymentReportListColumns: ColumnDef<PaymentInfo>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "student",
    header: "Student",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "enrolment_type",
    header: "Action",
  },
  {
    id: "paid_at",
    header: "Fees Collected Date",
    cell: ({ row }) => {
      const fees = row.original;
      return <div className="text-left">{fees.paid_at ?? "--"}</div>;
    },
  },
  {
    id: "amount",
    header: "Fees",
    cell: ({ row }) => {
      const fees = row.original;
      return <div>{fees.amount}</div>;
    },
  },
  {
    id: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const fees = row.original;
      return <div>{fees.discount}</div>;
    },
  },
  {
    id: "early_advance_rebate",
    header: "Early Advance Rebate",
    cell: ({ row }) => {
      const fees = row.original;
      return <div>{fees.early_advance_rebate}</div>;
    },
  },
  {
    id: "discounted_amount",
    header: "Discounted Amount",
    cell: ({ row }) => {
      const fees = row.original;
      return <div>{fees.discounted_amount}</div>;
    },
  },
];
