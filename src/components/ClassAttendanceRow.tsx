"use client";
import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TeachingUserList } from "@/types/index";
import { ClassLessonTodayStudentList } from "@/types/class";
import { AttendanceStatus } from "@/constants/index";
import { CalendarThemeLesson } from "@/types/calendar";

interface ClassAttendanceFormProps {
  classData: ClassLessonTodayStudentList;
  teacherList: TeachingUserList[];
  classIndex: number;
  calendarThemeLessonList: CalendarThemeLesson[];
}

const ClassAttendanceRow: React.FC<ClassAttendanceFormProps> = ({
  classData,
  teacherList,
  classIndex,
  calendarThemeLessonList,
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(
    classData.teacher?.toString()
  );
  const [selectedCoTeacher, setSelectedCoTeacher] = useState<string | null>(
    null
  );

  // Combine unmarked and attended students
  const allStudents = [
    ...classData.unmarked_students.map((student) => ({
      ...student,
      type: "unmarked" as const,
    })),
    ...classData.student_attendances.map((attendance) => ({
      ...attendance,
      type: "attended" as const,
    })),
  ];

  const [studentStatuses, setStudentStatuses] = useState<{
    [key: number]: string;
  }>(
    Object.fromEntries(
      allStudents.map((student) => [
        student.id,
        student.type === "attended" ? student.status : "",
      ])
    )
  );

  const handleStatusChange = (studentId: number, status: string) => {
    setStudentStatuses((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = () => {
    // Only proceed if teacher is selected and all students have a status
    if (
      selectedTeacher &&
      allStudents.every((student) => studentStatuses[student.id])
    ) {
      const submissionData = {
        classId: classData.id,
        teacherId: selectedTeacher,
        coTeacherId: selectedCoTeacher,
        studentStatuses: studentStatuses,
      };
      console.log({ submissionData });
      // Add your actual submission logic here
    }
  };

  const isSubmitEnabled =
    selectedTeacher &&
    allStudents.every((student) => studentStatuses[student.id]);

  return (
    <>
      <TableRow
        className={cn("bg-slate-100", { "bg-yellow-2": classIndex % 2 == 0 })}
      >
        <TableCell
          className="align-middle border-r-2"
          rowSpan={allStudents.length + 1}
        >
          <div className="flex flex-col">
            <div>
              {classData.class_instance.start_time.slice(0, 5)} {" - "}{" "}
              {classData.class_instance.end_time.slice(0, 5)}
            </div>
            {classData.class_instance.name}
          </div>
        </TableCell>
        <TableCell
          className="align-middle border-r-2 space-y-4"
          rowSpan={allStudents.length + 1}
        >
          <div className="flex flex-col gap-2">
            <Label className="text-xs">
              - Teacher <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={setSelectedTeacher} value={selectedTeacher}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent className="select-content">
                {teacherList.map((teacher) => (
                  <SelectItem
                    key={teacher.id}
                    value={teacher.id.toString()}
                    className="select-item"
                  >
                    {teacher.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-xs">- Co-Teacher (Optional)</Label>
            <Select
              onValueChange={setSelectedCoTeacher}
              value={selectedCoTeacher || undefined}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent className="select-content">
                {teacherList.map((teacher) => (
                  <SelectItem
                    key={teacher.id}
                    value={teacher.id.toString()}
                    className="select-item"
                  >
                    {teacher.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TableCell>
      </TableRow>

      {allStudents.map((student, index) => (
        <TableRow
          key={student.id}
          className={cn("bg-slate-100", { "bg-yellow-2": classIndex % 2 == 0 })}
        >
          <TableCell className="border-r-2">
            {student.type === "unmarked"
              ? student.student.fullname
              : student.enrollment.student.fullname}
          </TableCell>
          <TableCell className="border-r-2">
            <div className="flex gap-2">
              {AttendanceStatus.map((status) => (
                <Button
                  key={status.value}
                  size="sm"
                  onClick={() => handleStatusChange(student.id, status.value)}
                  className={cn(
                    `px-3 py-1 text-sm ${status.className}`,
                    studentStatuses[student.id] === status.value
                      ? status.isActive
                      : ""
                  )}
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </TableCell>
        </TableRow>
      ))}
      <TableRow className="bg-slate-200">
        <TableCell className="align-middle" colSpan={5}>
          <div className="flex justify-end">
            <Button
              className="bg-blue-900 text-white hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={!isSubmitEnabled}
            >
              Submit
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ClassAttendanceRow;
