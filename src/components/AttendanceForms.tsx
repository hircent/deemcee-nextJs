"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeachingUserList } from "@/types/index";
import { CalendarThemeLesson } from "@/types/calendar";
import { ClassLessonTodayStudentList } from "@/types/class";
import ClassAttendanceRow from "./ClassAttendanceRow";

const AttendanceForms = ({
  teacherList,
  calendarThemeLessonList,
  todayStudentList,
}: {
  teacherList: TeachingUserList[];
  calendarThemeLessonList: CalendarThemeLesson[];
  todayStudentList: ClassLessonTodayStudentList[];
}) => {
  if (todayStudentList.length === 0) {
    return <div className="text-center p-4">No Class today</div>;
  }

  return (
    <Table className="w-full border-2 border-gray-200 border-t-0">
      <TableHeader className="bg-yellow-10 text-yellow-12">
        <TableRow>
          <TableHead className="w-[150px] border-r-2 ">
            Time & Classname
          </TableHead>
          <TableHead className="w-[200px] border-r-2">Teacher</TableHead>
          <TableHead className="w-[200px] border-r-2">Student Name</TableHead>
          <TableHead className="w-[300px] border-r-2">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todayStudentList.map((classData, classIndex) => {
          return (
            <ClassAttendanceRow
              key={classData.id}
              classData={classData}
              classIndex={classIndex}
              teacherList={teacherList}
              calendarThemeLessonList={calendarThemeLessonList}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AttendanceForms;
