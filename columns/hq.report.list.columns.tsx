"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BranchPaymentInfo } from "@/types/payment";

export const HQPaymentReportListColumns: ColumnDef<BranchPaymentInfo>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "total_active_students",
    header: "Total Active Students",
  },
  {
    accessorKey: "total_fees",
    header: "Total Fees",
  },
  {
    id: "royalty",
    header: "Royalty",
  },
  {
    id: "actions",
    header: "Actions",
  },
];
