"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { generateYearRange } from "@/lib/utils";

const useFilterUrl = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateUrlParams = (params: Record<string, string | undefined>) => {
    // Create a new URLSearchParams object
    const currentParams = new URLSearchParams(searchParams?.toString());

    // Clear out existing filter-related parameters
    const filterKeys = ["year", "month", "day"];
    filterKeys.forEach((key) => currentParams.delete(key));

    // Add new parameters, skipping undefined values
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "none") {
        currentParams.set(key, value);
      }
    });

    // Construct the new URL
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    // Navigate to the new URL
    router.push(newUrl, { scroll: false });
  };

  return updateUrlParams;
};

// Generate month names
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generate days (1-31)
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const CalendarThemeLessonFilterComponent = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    (new Date().getMonth() + 1).toString()
  );
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

  const updateUrlParams = useFilterUrl();

  const filterHandler = () => {
    updateUrlParams({
      year: selectedYear,
      month: selectedMonth == "none" ? undefined : selectedMonth,
      day: selectedDay,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 shadow-md rounded-lg my-4 bg-yellow-2">
      <div className="flex flex-col space-y-2">
        <Label>Year</Label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px] bg-yellow-2">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent className="bg-yellow-2">
            {generateYearRange().map((year) => (
              <SelectItem
                key={year}
                value={year}
                className="cursor-pointer hover:bg-yellow-6"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Month</Label>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px] bg-yellow-2">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent className="bg-yellow-2">
            <SelectItem
              value="none"
              className="cursor-pointer hover:bg-yellow-6"
            >
              All
            </SelectItem>
            {MONTHS.map((month, index) => (
              <SelectItem
                key={month}
                value={(index + 1).toString()}
                className="cursor-pointer hover:bg-yellow-6"
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Day (Optional)</Label>
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-[180px] bg-yellow-2">
            <SelectValue placeholder="Select Day" />
          </SelectTrigger>
          <SelectContent className="bg-yellow-2">
            <SelectItem
              value="none"
              className="cursor-pointer hover:bg-yellow-6"
            >
              All
            </SelectItem>
            {DAYS.map((day) => (
              <SelectItem
                key={day}
                value={day}
                className="cursor-pointer hover:bg-yellow-6"
              >
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          onClick={filterHandler}
          className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors duration-200 text-xs sm:text-base px-3 py-2"
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
};
