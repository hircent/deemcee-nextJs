"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TeachingUserList } from "@/types/index";
import { CalendarThemeLesson } from "@/types/calendar";
import { ClassLessonTodayStudentList } from "@/types/class";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

import ClassAttendanceForm from "./ClassAttendanceRow";
import AttendanceRow from "./AttendanceRow";
import { stat } from "fs";
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
            />
          );
        })}
        {/* {todayStudentList.map((classData, classIndex) => {
          // Combine unmarked and attended students with a unified structure
          const allStudents = [
            ...classData.unmarked_students.map((student) => ({
              fullname: student.student.fullname,
              type: "unmarked",
              id: student.id,
              status: undefined,
            })),
            ...classData.student_attendances.map((attendance) => ({
              fullname: attendance.enrollment.student.fullname,
              type: "attended",
              id: attendance.id,
              status: attendance.status,
            })),
          ];

          return (
            <React.Fragment key={classData.id}>
              {allStudents.length > 0 &&
                allStudents.map((studentData, studentIndex) => (
                  <AttendanceRow
                    key={`${classData.id}-${studentData.id}`}
                    classData={classData}
                    classIndex={classIndex}
                    teacherList={teacherList}
                    studentData={studentData}
                    studentIndex={studentIndex}
                    totalStudents={allStudents.length}
                  />
                ))}
            </React.Fragment>
          );
        })} */}
      </TableBody>
    </Table>
  );
};

export default AttendanceForms;
