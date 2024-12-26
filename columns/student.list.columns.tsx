"use client";
import { ColumnDef } from "@tanstack/react-table";
import { extractDate } from "@/lib/utils";
import { StudentProps } from "@/types/student";
import { DeleteStudent } from "@/components/DeleteStudent";

export const StudentListColumns: ColumnDef<StudentProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fullname",
    header: "Fullname",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "deemcee_starting_grade",
    header: "Starting Grade",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "enrolment_date",
    header: "Enrolment Date",
    cell: ({ row }) => {
      return extractDate(row.getValue("enrolment_date"));
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;

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
          <div>Edit</div>
          <DeleteStudent
            type="student"
            name={student.fullname}
            id={student.id}
          />
        </div>
      );
    },
  },
];
