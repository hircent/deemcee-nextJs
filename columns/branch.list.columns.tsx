"use client"
import { BranchProps } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit } from "@/components/Edit"
import { Delete } from "@/components/Delete"

export const BranchListColumns : ColumnDef<BranchProps>[] = [
    {
        accessorKey:"id",
        header:"ID"
    },
    {
        accessorKey:"name",
        header:"Name"
    },
    {
        accessorKey:"business_reg_no",
        header:"Business_reg_no"
    },
    {
        accessorKey:"operation_date",
        header:"Operation Date"
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const branch = row.original
     
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
            //     <DropdownMenuItem className="hover:bg-slate-400 cursor-pointer"
            //       onClick={() => navigator.clipboard.writeText(branch.id.toString())}
            //     >
            //       Copy payment ID
            //     </DropdownMenuItem>
            //     <DropdownMenuSeparator />
            //     <DropdownMenuItem className="hover:bg-slate-400 cursor-pointer">
            //         <Pencil 
            //           size={18} 
            //           className="text-gray-500 group-hover:text-blue-500 transition-colors"
            //         />
            //     </DropdownMenuItem>
            //     <DropdownMenuItem className="hover:bg-slate-400 cursor-pointer">
            //         <Trash2 
            //           size={18} 
            //           className="text-gray-500 group-hover:text-red-500 transition-colors"
            //         />
            //     </DropdownMenuItem>
            //   </DropdownMenuContent>
            // </DropdownMenu>
            <div className="flex gap-4">
              <Edit/>
              <Delete/>
            </div>
          )
        }
    }
]