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
import {
  ClassAttendanceFormProps,
  ClassData,
  ClassLessonTodayStudentList,
} from "@/types/class";
import { AttendanceStatus, SERVER_ACTION_STATE } from "@/constants/index";
import { CalendarThemeLesson } from "@/types/calendar";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";
import { markAttendances } from "@/lib/actions/class.action";
import { Input } from "./ui/input";

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
  const [replacementDate, setReplacementDate] = useState<{
    [key: number]: string;
  }>("");
  const { toast } = useToast();
  const [state, action] = useFormState(markAttendances, SERVER_ACTION_STATE);

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

    if (status !== "REPLACEMENT") {
      setReplacementDate((prev) => ({
        ...prev,
        [studentId]: "",
      }));
    }
  };

  const handleReplacementDateChange = (
    studentId: number,
    replacementDate: string
  ) => {
    setReplacementDate((prev) => ({
      ...prev,
      [studentId]: replacementDate,
    }));
  };

  const handleSubmit = async () => {
    // Validate that all students have a status
    const isStatusComplete = allStudents.every(
      (student) => studentStatuses[student.id]
    );

    // Additional validation for REPLACEMENT status
    const isReplacementValid = allStudents.every(
      (student) =>
        studentStatuses[student.id] !== "REPLACEMENT" ||
        (studentStatuses[student.id] === "REPLACEMENT" &&
          replacementDate[student.id])
    );

    if (selectedTeacher && isStatusComplete && isReplacementValid) {
      const studentStatusArray = allStudents.map((student) => ({
        id: student.id,
        status: studentStatuses[student.id],
        replacement_date: replacementDate[student.id],
      }));

      const formData = new FormData();
      formData.append("classId", classData.id.toString());
      formData.append("teacherId", selectedTeacher);

      if (selectedCoTeacher) {
        formData.append("coTeacherId", selectedCoTeacher);
      }

      formData.append("student_enrolments", JSON.stringify(studentStatusArray));

      formData.append(
        "theme_lesson",
        getThemeLesson(
          calendarThemeLessonList,
          classData.class_instance
        ).id.toString()
      );

      await action(formData);
    } else {
      // Show error toast if validation fails
      if (!isStatusComplete) {
        toast({
          title: "Attendance Error",
          description: "Please set attendance status for all students.",
          className: cn(`bottom-0 left-0`, "bg-error-100"),
          duration: 3000,
        });
      } else if (!isReplacementValid) {
        toast({
          title: "Replacement Date Error",
          description:
            "Please select a replacement date for students with REPLACEMENT status.",
          className: cn(`bottom-0 left-0`, "bg-error-100"),
          duration: 3000,
        });
      }
    }
  };

  const getThemeLesson = (
    calendarThemeLessonList: CalendarThemeLesson[],
    classData: ClassData
  ) => {
    const themeLesson = calendarThemeLessonList.map((theme) => ({
      id: theme.id,
      category: theme.category,
      theme: theme.theme.name,
      themeLesson: theme.theme_lesson.name,
    }));
    const lesson = themeLesson.filter(
      (lesson) => lesson.category === classData.name
    );
    return lesson[0];
  };

  const isSubmitEnabled =
    selectedTeacher &&
    allStudents.every((student) => studentStatuses[student.id]);

  return (
    <>
      <TableRow>
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
        <TableRow key={student.id}>
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
            {studentStatuses[student.id] === "REPLACEMENT" && (
              <Input
                className="mt-4"
                type="date"
                value={replacementDate[student.id]}
                onChange={(e) =>
                  handleReplacementDateChange(student.id, e.target.value)
                }
                required
              />
            )}
          </TableCell>
        </TableRow>
      ))}
      <TableRow className="bg-slate-100">
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
