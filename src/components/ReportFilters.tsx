"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { MONTHS, REGIONS } from "@/constants/index";
import { formUrlQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";

const ReportFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryYear = searchParams?.get("year");
  const queryMonth = searchParams?.get("month");
  const regions = searchParams?.get("region");
  const [yearNow, setYearNow] = useState<string>(
    queryYear || new Date().getFullYear().toString()
  );
  const [monthNow, setMonthNow] = useState<string>(
    queryMonth || (new Date().getMonth() + 1).toString()
  );
  const [region, setRegion] = useState<string>(regions || "Malaysia");
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
  }, [yearNow, router, searchParams]);

  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams!.toString(),
      key: "month",
      value: monthNow,
    });
    router.push(newUrl, { scroll: false });
  }, [monthNow, router, searchParams]);

  useEffect(() => {
    if (pathname === "/report/hq") {
      const newUrl = formUrlQuery({
        params: searchParams!.toString(),
        key: "region",
        value: region,
      });
      router.push(newUrl, { scroll: false });
    }
  }, [region, router, searchParams, pathname]);
  return (
    <Card className="flex gap-4 p-4 bg-indigo-200">
      <div className="flex items-center gap-3 text-indigo-800">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters :</span>
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

      {pathname === "/report/hq" && (
        <div>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px] bg-yellow-2">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent className="select-content">
              {REGIONS.map((reg) => (
                <SelectItem
                  key={reg.id}
                  value={reg.value}
                  className="select-item"
                >
                  {reg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </Card>
  );
};

export default ReportFilters;
