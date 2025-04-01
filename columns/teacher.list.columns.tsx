"use client";
import { TypeUserProps } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, Pencil, Trash2 } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditBranch } from "@/components/EditBranch";
import { DeleteBranch } from "@/components/DeleteBranch";
import { extractDate } from "@/lib/utils";
import { EditUser } from "@/components/EditUser";
import { DeleteUser } from "@/components/DeleteUser";

export const TeacherListColumns: ColumnDef<TypeUserProps>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
    cell: ({ row }) => {
      return extractDate(row.getValue("updated_at"));
    },
  },
  // {
  //   accessorKey: "is_active",
  //   header: "Is Active",
  //   cell: ({ row }) => {
  //     const isActive = row.getValue("is_active");
  //     if (isActive) {
  //       return (
  //         <div>
  //           <CircleCheck color="green" />
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div>
  //           <CircleX color="red" />
  //         </div>
  //       );
  //     }
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const teacher = row.original;

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
        <div className="flex gap-4 text-black-2">
          <EditUser type={"teacher"} id={teacher.id} />
          <DeleteUser
            type={"teacher"}
            name={teacher.username}
            id={teacher.id}
          />
        </div>
      );
    },
  },
];
