"use client";
import { BranchProps } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import { EditBranch } from "@/components/EditBranch";
import { DeleteBranch } from "@/components/DeleteBranch";

export const BranchListColumns: ColumnDef<BranchProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
        <div className="flex gap-4">
          <EditBranch type={"branch"} id={branch.id} />
          <DeleteBranch type={"branch"} name={branch.name} id={branch.id} />
        </div>
      );
    },
  },
];
