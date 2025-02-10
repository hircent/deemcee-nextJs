import AttendanceForms from "@/components/AttendanceForms";
import { getCalendarThemeLessonByDate } from "@/lib/actions/calendar.action";
import { getShouldAttendStudentList } from "@/lib/actions/student.action";
import { getTeachingUserList } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types/index";
import React from "react";

const AttendanceTable = async ({ searchParams }: SearchParamProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [teachingUserList, calendarThemeLessonList, todayStudentList] =
    await Promise.all([
      getTeachingUserList(),
      getCalendarThemeLessonByDate(
        searchParams.date ? searchParams.date.toString() : today
      ),
      getShouldAttendStudentList(
        searchParams.date ? searchParams.date.toString() : today
      ),
    ]);

  return (
    <div className="overflow-y-auto custom-scrollbar">
      <AttendanceForms
        teacherList={teachingUserList}
        calendarThemeLessonList={calendarThemeLessonList}
        todayStudentList={todayStudentList}
      />
    </div>
  );
};

export default AttendanceTable;
