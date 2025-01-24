import AttendanceForms from "@/components/AttendanceForms";
import { getCalendarThemeLessonByDate } from "@/lib/actions/calendar.action";
import { getShouldAttendStudentList } from "@/lib/actions/student.action";
import { getTeachingUserList } from "@/lib/actions/user.actions";
import React from "react";

const AttendanceTable = async () => {
  const today = new Date().toISOString().split("T")[0];
  const [teachingUserList, calendarThemeLessonList, todayStudentList] =
    await Promise.all([
      getTeachingUserList(),
      getCalendarThemeLessonByDate(today),
      getShouldAttendStudentList(today),
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
