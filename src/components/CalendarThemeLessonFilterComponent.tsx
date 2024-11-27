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

// Generate an array of years (last 5 years to next 5 years)
const generateYearRange = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 11 }, (_, i) => (currentYear - 5 + i).toString());
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
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString()
  );
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

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
        <Button className="mt-auto">Apply Filter</Button>
      </div>
    </div>
  );
};
