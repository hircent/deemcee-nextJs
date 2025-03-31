"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BranchTotalPayment } from "@/types/payment";

export const HQPaymentReportListColumns: ColumnDef<BranchTotalPayment>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Branch",
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
  },
  {
    accessorKey: "total_discount",
    header: "Total Discount",
  },
  {
    accessorKey: "discounted_amount",
    header: "Discounted Amount",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
  {
    accessorKey: "loyalty_fees",
    header: "Loyalty Fees",
  },
];
