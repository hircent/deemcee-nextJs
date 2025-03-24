"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { MONTHS } from "@/constants/index";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";

const ReportFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryYear = searchParams?.get("year");
  const queryMonth = searchParams?.get("month");
  const [yearNow, setYearNow] = useState<string>(
    queryYear || new Date().getFullYear().toString()
  );
  const [monthNow, setMonthNow] = useState<string>(
    queryMonth || (new Date().getMonth() + 1).toString()
  );
  const today = new Date();
  const years = today.getFullYear() - 2018;
  const yearOptions = Array.from({ length: years + 1 }, (_, i) => i + 2018);

  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams!.toString(),
      key: "year",
      value: yearNow,
    });
    router.push(newUrl, { scroll: false });
  }, [yearNow]);

  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams!.toString(),
      key: "month",
      value: monthNow,
    });
    router.push(newUrl, { scroll: false });
  }, [monthNow]);
  return (
    <Card className="flex gap-2 p-4 bg-blue-200">
      <div className="flex items-center gap-2 text-blue-900">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      <div>
        {/* Select year from 2018 to now */}
        <Select value={yearNow} onValueChange={setYearNow}>
          <SelectTrigger className="w-[180px] bg-yellow-2">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="select-content">
            {yearOptions.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
                className="select-item"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {/* Select month from 1 to 12 */}
        <Select value={monthNow} onValueChange={setMonthNow}>
          <SelectTrigger className="w-[180px] bg-yellow-2">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent className="select-content">
            {MONTHS.map((month) => (
              <SelectItem
                key={month.id}
                value={month.value}
                className="select-item"
              >
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default ReportFilters;
