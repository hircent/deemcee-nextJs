"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { STUDENT_FILTERTING_STATUSES } from "@/constants/index";
import { cn } from "@/lib/utils";

const StudentFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isStudentPage = pathname === "/deusers/student";

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete("page");
    if (value == "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    // Preserve existing search query if any
    const query = params.toString();
    router.push(`/deusers/student${query ? `?${query}` : ""}`);
  };

  return (
    <div>
      {isStudentPage && (
        <Select
          defaultValue={searchParams?.get("status") || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="select-content">
            <SelectItem value="all" className="select-item">
              All Status
            </SelectItem>
            {STUDENT_FILTERTING_STATUSES.map((status) => (
              <SelectItem
                key={status.value}
                value={status.value}
                className="select-item"
              >
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default StudentFilter;
