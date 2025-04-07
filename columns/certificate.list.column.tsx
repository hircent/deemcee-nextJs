"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CertificateData } from "@/types/certificate";
import CertViewer from "@/components/CertViewer";

export const CertificateListColumns: ColumnDef<CertificateData>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-gray-500">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "student.first_name",
    header: "Name",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const cert = row.original;

      return (
        <div className="flex gap-4 w-36">
          <CertViewer cert={cert} />
        </div>
      );
    },
  },
];
