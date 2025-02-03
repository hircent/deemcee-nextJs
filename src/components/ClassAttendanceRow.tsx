"use client";
import React, { useEffect, useState } from "react";
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
import { ClassAttendanceFormProps, ClassData } from "@/types/class";
import { AttendanceStatus, SERVER_ACTION_STATE } from "@/constants/index";
import { CalendarThemeLesson } from "@/types/calendar";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";
import { getTimeslots, markAttendances } from "@/lib/actions/class.action";
import { Input } from "./ui/input";
import { TimeslotData } from "@/types/index";

const ClassAttendanceRow: React.FC<ClassAttendanceFormProps> = ({
  classData,
  teacherList,
  classIndex,
  calendarThemeLessonList,
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(
    classData.teacher?.toString()
  );
  const [selectedCoTeacher, setSelectedCoTeacher] = useState<
    string | undefined
  >(classData.co_teacher?.toString());
  const [replacementDate, setReplacementDate] = useState<{
    [key: number]: string;
  }>("");
  const { toast } = useToast();
  const [state, action] = useFormState(markAttendances, SERVER_ACTION_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeslotsPerStudent, setTimeslotsPerStudent] = useState<{
    [key: number]: TimeslotData[];
  }>({});
  const [placeholderPerStudent, setPlaceholderPerStudent] = useState<{
    [key: number]: string;
  }>({});
  const [ableSelectSlotPerStudent, setAbleSelectSlotPerStudent] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedTimeslots, setSelectedTimeslots] = useState<{
    [key: number]: string;
  }>({});
  // Combine unmarked and attended students
  const allStudents = [
    ...classData.unmarked_students.map((student) => ({
      ...student,
      category: classData.class_instance.name,
      type: "unmarked" as const,
    })),
    ...classData.student_attendances.map((attendance) => ({
      ...attendance,
      category: classData.class_instance.name,
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
      setReplacementDate((prev) => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });

      setSelectedTimeslots((prev) => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });

      // Reset the timeslot selection state for this student
      setTimeslotsPerStudent((prev) => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });
      setAbleSelectSlotPerStudent((prev) => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });
      setPlaceholderPerStudent((prev) => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });
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

  const handleTimeslotChange = (studentId: number, timeslotId: string) => {
    setSelectedTimeslots((prev) => ({
      ...prev,
      [studentId]: timeslotId,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const isStatusComplete = allStudents.every(
        (student) => studentStatuses[student.id]
      );

      // Additional validation for REPLACEMENT status
      const isReplacementValid = allStudents.every(
        (student) =>
          studentStatuses[student.id] !== "REPLACEMENT" ||
          (studentStatuses[student.id] === "REPLACEMENT" &&
            replacementDate[student.id] &&
            selectedTimeslots[student.id])
      );

      if (selectedTeacher && isStatusComplete && isReplacementValid) {
        const studentStatusArray = allStudents.map((student) => ({
          id: student.id,
          status: studentStatuses[student.id],
          replacement_date: replacementDate[student.id],
          replacement_timeslot: selectedTimeslots[student.id],
        }));

        const formData = new FormData();
        formData.append("classId", classData.id.toString());
        formData.append("status", classData.status);
        formData.append("teacherId", selectedTeacher);

        if (selectedCoTeacher) {
          formData.append("coTeacherId", selectedCoTeacher);
        }

        formData.append(
          "student_enrolments",
          JSON.stringify(studentStatusArray)
        );

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
            title: "Replacement Information Error",
            description:
              "Please select both a replacement date and timeslot for students with REPLACEMENT status.",
            className: cn(`bottom-0 left-0`, "bg-error-100"),
            duration: 3000,
          });
        }
        setIsSubmitting(false);
        // Validate that all students have a status
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to submit attendance data",
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }
  };

  const getSelectTimeslot = async (
    studentId: number,
    date: string,
    categoryName: string
  ) => {
    // Reset states for this specific student
    setTimeslotsPerStudent((prev) => ({
      ...prev,
      [studentId]: [],
    }));
    setAbleSelectSlotPerStudent((prev) => ({
      ...prev,
      [studentId]: false,
    }));
    setPlaceholderPerStudent((prev) => ({
      ...prev,
      [studentId]: "Loading...",
    }));

    // Clear the selected timeslot when date changes
    setSelectedTimeslots((prev) => ({
      ...prev,
      [studentId]: "",
    }));

    const timeslots = await getTimeslots({
      date: date,
      categoryName: categoryName,
    });

    if (timeslots.length === 0) {
      setPlaceholderPerStudent((prev) => ({
        ...prev,
        [studentId]: "No available time slots",
      }));
    } else {
      setAbleSelectSlotPerStudent((prev) => ({
        ...prev,
        [studentId]: true,
      }));
      setTimeslotsPerStudent((prev) => ({
        ...prev,
        [studentId]: timeslots,
      }));
      setPlaceholderPerStudent((prev) => ({
        ...prev,
        [studentId]: "Select a time slot",
      }));
    }
  };

  const getThemeLesson = (
    calendarThemeLessonList: CalendarThemeLesson[],
    classData: ClassData
  ) => {
    const themeLesson = calendarThemeLessonList.map((theme) => ({
      id: theme.theme_lesson.id,
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

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 2000,
      });
    }
    if (!state.success && state.success != null) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }

    setIsSubmitting(false);
  }, [state, toast]);

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <Input
                  className="col-span-1"
                  type="date"
                  value={replacementDate[student.id]}
                  onChange={(e) => {
                    handleReplacementDateChange(student.id, e.target.value);
                    getSelectTimeslot(
                      student.id,
                      e.target.value,
                      student.category
                    );
                  }}
                  required
                />
                <Select
                  key={`${student.id}-${replacementDate[student.id]}`}
                  onValueChange={(value) =>
                    handleTimeslotChange(student.id, value)
                  }
                  value={selectedTimeslots[student.id]}
                >
                  <SelectTrigger
                    disabled={!ableSelectSlotPerStudent[student.id]}
                    className="col-span-2"
                  >
                    <SelectValue
                      placeholder={
                        placeholderPerStudent[student.id] ||
                        "Kindly select date"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="select-content w-full">
                    {timeslotsPerStudent[student.id]?.map((ts) => (
                      <SelectItem
                        disabled={ts.student_in_class >= 6}
                        key={ts.id}
                        value={ts.id.toString()}
                        className="select-item"
                      >
                        {ts.label + " - " + "(" + ts.student_in_class + "/6)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
              disabled={!isSubmitEnabled || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ClassAttendanceRow;
