"use client";
import { TypeUserProps } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import { extractDate } from "@/lib/utils";
import { EditUser } from "@/components/EditUser";
import { DeleteUser } from "@/components/DeleteUser";

export const ManagerlListColumns: ColumnDef<TypeUserProps>[] = [
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const manager = row.original;

      return (
        <div className="flex gap-4 text-black-2">
          <EditUser type={"manager"} id={manager.id} />
          <DeleteUser
            type={"manager"}
            name={manager.username}
            id={manager.id}
          />
        </div>
      );
    },
  },
];
