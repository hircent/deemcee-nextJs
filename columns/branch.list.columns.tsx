"use client";
import { BranchProps } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import { EditBranch } from "@/components/EditBranch";
import { DeleteBranch } from "@/components/DeleteBranch";

export const BranchListColumns: ColumnDef<BranchProps>[] = [
  {
    accessorKey: "id",
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
    accessorKey: "business_reg_no",
    header: "Business_reg_no",
  },
  {
    accessorKey: "operation_date",
    header: "Operation Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const branch = row.original;

      return (
        <div className="flex gap-4">
          <EditBranch type={"branch"} id={branch.id} />
          <DeleteBranch type={"branch"} name={branch.name} id={branch.id} />
        </div>
      );
    },
  },
];
