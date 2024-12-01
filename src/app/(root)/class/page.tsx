import { CalendarThemeLessonListColumns } from "@/columns/calendarThemeLesson.list.columns";
import { CalendarThemeLessonFilterComponent } from "@/components/CalendarThemeLessonFilterComponent";
import { CalendarThemeLessonListTable } from "@/components/CalendarThemeLessonListPage";
import { getCalendarThemeLessonData } from "@/lib/actions/calendar.action";
import { SearchParamProps } from "@/types/index";
import React from "react";

const Page = async ({ searchParams }: SearchParamProps) => {
  let currentYear = new Date().getFullYear().toString();
  let currentMonth = (new Date().getMonth() + 1).toString();

  let year = searchParams.year ? searchParams.year.toString() : currentYear;
  let month = searchParams.month ? searchParams.month.toString() : currentMonth;
  let day = searchParams.day ? searchParams.day.toString() : null;
  try {
    const themeLessonData = await getCalendarThemeLessonData(year, month, day);

    return (
      <div>
        <CalendarThemeLessonFilterComponent />
        <CalendarThemeLessonListTable
          columns={CalendarThemeLessonListColumns}
          data={themeLessonData}
        />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Page;
