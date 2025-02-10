"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const DateInputFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.get("date");
  const isAttendancePage = pathname === "/class/attendance";
  const [date, setDate] = useState<string | undefined>(query || undefined);

  useEffect(() => {
    if (!isAttendancePage) return;

    if (date) {
      const newUrl = formUrlQuery({
        params: searchParams!.toString(),
        key: "date",
        value: date,
      });

      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams!.toString(),
        keysToRemove: ["date"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [searchParams, router, pathname, query, date, isAttendancePage]);

  if (!isAttendancePage) return null;

  return (
    <div className="relative flex flex-shrink-0 w-64">
      <Input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 bg-yellow-2"
        type="date"
        defaultValue={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default DateInputFilter;
