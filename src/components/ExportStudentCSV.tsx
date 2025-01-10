"use client";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

export const ExportStudents = ({ id, name }: { id: string; name: string }) => {
  const handleExport = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/students/export-csv`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            branchId: id, // You'll need to pass this from props or context
          },
        }
      );

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `students-${name}-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to export students:", error);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Export as CSV
    </Button>
  );
};
