"use client"
import { BranchProps } from "@/types/index"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"

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
            //     <DropdownMenuItem className="hover:bg-slate-400 cursor-pointer">View customer</DropdownMenuItem>
            //     <DropdownMenuItem className="hover:bg-slate-400 cursor-pointer">View payment details</DropdownMenuItem>
            //   </DropdownMenuContent>
            // </DropdownMenu>
            <div className="flex gap-4">
              <button 
                className="group p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Edit"
              >
                <Pencil 
                  size={18} 
                  className="text-gray-500 group-hover:text-blue-500 transition-colors"
                />
              </button>
              <button 
                className="group p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Delete"
              >
                <Trash2 
                  size={18} 
                  className="text-gray-500 group-hover:text-red-500 transition-colors"
                />
              </button>
            </div>
          )
        }
    }
]