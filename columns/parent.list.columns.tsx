"use client";
import { TypeUserProps } from "@/types/index";
import { ColumnDef } from "@tanstack/react-table";
import { extractDate } from "@/lib/utils";
import { DeleteUser } from "@/components/DeleteUser";
import { EditParentProfile } from "@/components/EditParentProfile";

export const ParentListColumns: ColumnDef<TypeUserProps>[] = [
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
      const parent = row.original;

      return (
        <div className="flex gap-4 text-black-2">
          <EditParentProfile type={"parent"} id={parent.id} />
          <DeleteUser type={"parent"} name={parent.username} id={parent.id} />
        </div>
      );
    },
  },
];
