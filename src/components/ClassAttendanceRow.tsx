"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import { cn, dateIsBeforeToday } from "@/lib/utils";
import { ClassAttendanceFormProps, ClassData } from "@/types/class";
import {
  AttendanceStatus,
  ReplacementAttendanceStatus,
  SERVER_ACTION_STATE,
} from "@/constants/index";
import { CalendarThemeLesson } from "@/types/calendar";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";
import { getTimeslots, markAttendances } from "@/lib/actions/class.action";
import { Input } from "./ui/input";
import { TimeslotData } from "@/types/index";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "./ui/badge";
import { set } from "zod";

const ClassAttendanceRow: React.FC<ClassAttendanceFormProps> = ({
  classData,
  teacherList,
  isFutureDate,
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

  const [replacedLessonStatus, setReplacedLessonStatus] = useState<{
    [key: number]: string;
  }>({});
  // Combine unmarked and attended students
  const allStudents = useMemo(
    () => [
      ...(classData.unmarked_enrolments?.map((student) => ({
        ...student,
        category: classData.class_instance.name,
        type: "unmarked" as const,
      })) ?? []),
      ...(classData.student_attendances?.map((attendance) => ({
        ...attendance,
        category: classData.class_instance.name,
        type: "attended" as const,
      })) ?? []),
      ...(classData.replacement_students?.map((attendance) => ({
        ...attendance,
        category: classData.class_instance.name,
        type: "replacement" as const,
      })) ?? []),
    ],
    [
      classData.unmarked_enrolments,
      classData.student_attendances,
      classData.replacement_students,
      classData.class_instance.name,
    ]
  );

  // Initialize student statuses with memoized allStudents
  const initialStudentStatuses = useMemo(
    () =>
      Object.fromEntries(
        allStudents.map((student) => [
          student.id,
          student.type === "unmarked" ? "" : student.status,
        ])
      ),
    [allStudents]
  );

  const [studentStatuses, setStudentStatuses] = useState(
    initialStudentStatuses
  );

  useEffect(() => {
    const newReplacementDates: { [key: number]: string } = {};
    const newSelectedTimeslots: { [key: number]: string } = {};
    const newReplacedLessonStatus: { [key: number]: string } = {};

    allStudents.forEach((student) => {
      if (
        student.type === "attended" &&
        student.status === "REPLACEMENT" &&
        student.replacement_class_info
      ) {
        newReplacementDates[student.id] = student.replacement_class_info.date;
        newSelectedTimeslots[student.id] =
          student.replacement_class_info.id.toString();
        newReplacedLessonStatus[student.id] =
          student.replacement_class_info.status;

        // Fetch timeslots for the existing replacement date
        getSelectTimeslot(
          student.id,
          student.replacement_class_info.date,
          student.category
        );
      }
    });

    setReplacementDate(newReplacementDates);
    setSelectedTimeslots(newSelectedTimeslots);
    setReplacedLessonStatus(newReplacedLessonStatus);
  }, [allStudents]);

  const handleStatusChange = (studentId: number, status: string) => {
    setStudentStatuses((prev) => ({
      ...prev,
      [studentId]: status,
    }));

    // if (status !== "REPLACEMENT") {
    //   setReplacementDate((prev) => {
    //     const newState = { ...prev };
    //     delete newState[studentId];
    //     return newState;
    //   });
  };

  const handleReplacementDateChange = (
    studentId: number,
    replacementDate: string,
    category: string
  ) => {
    setReplacementDate((prev) => ({
      ...prev,
      [studentId]: replacementDate,
    }));

    if (replacementDate === "") return;

    // Check if replacement date is not today or in the future
    if (dateIsBeforeToday(replacementDate)) {
      setPlaceholderPerStudent((prev) => ({
        ...prev,
        [studentId]: "No available time slots.",
      }));
      toast({
        title: "Replacement Date Error",
        description: "Replacement date cannot be in the PAST.",
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
      return;
    }
    getSelectTimeslot(studentId, replacementDate, category);
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

      const isStatusComplete = allStudents.every((student) => {
        return (
          studentStatuses[student.id] &&
          studentStatuses[student.id] !== "PENDING"
        );
      });

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
          is_replacement_lesson: student.type === "replacement" ? true : false,
          replacement_date: replacementDate[student.id],
          replacement_timeslot_class_id: selectedTimeslots[student.id],
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

        action(formData);
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
    allStudents.every(
      (student) =>
        studentStatuses[student.id] && studentStatuses[student.id] !== "PENDING"
    );

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
            <div>{classData.class_instance.name}</div>
            <div>{classData.class_instance.display_name}</div>
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
            {student.type === "attended"
              ? student.enrollment.student.fullname +
                " -(G" +
                student.enrollment.student.grade +
                ")"
              : student.student.fullname + " -(G" + student.student.grade + ")"}
          </TableCell>
          <TableCell className="border-r-2">
            <div className="flex gap-2">
              {student.type === "replacement" ? (
                <>
                  <div className="flex gap-2 flex-col">
                    <div className="flex gap-2">
                      {ReplacementAttendanceStatus.map((status) => (
                        <Button
                          disabled={status.isDisabled}
                          key={status.value}
                          size="sm"
                          onClick={() =>
                            handleStatusChange(student.id, status.value)
                          }
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
                    <Separator className="h-px bg-slate-200 my-1" />
                    <small>
                      Replacement for :{" "}
                      <Badge className="text-xs bg-orange-100 text-orange-600 ml-2">
                        {student.replacement_for_lesson}
                      </Badge>
                    </small>
                  </div>
                </>
              ) : (
                <>
                  {AttendanceStatus.map((status) => (
                    <Button
                      key={status.value}
                      size="sm"
                      onClick={() =>
                        handleStatusChange(student.id, status.value)
                      }
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
                </>
              )}
            </div>
            {studentStatuses[student.id] === "REPLACEMENT" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <Input
                    className="col-span-1"
                    type="date"
                    value={replacementDate[student.id] || ""}
                    onChange={(e) => {
                      handleReplacementDateChange(
                        student.id,
                        e.target.value,
                        student.category
                      );
                    }}
                    required
                    disabled={
                      replacedLessonStatus[student.id] === "ABSENT" ||
                      replacedLessonStatus[student.id] === "ATTENDED"
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Select
                    key={`${student.id}-${replacementDate[student.id]}`}
                    onValueChange={(value) =>
                      handleTimeslotChange(student.id, value)
                    }
                    value={selectedTimeslots[student.id] || ""}
                    disabled={
                      replacedLessonStatus[student.id] === "ABSENT" ||
                      replacedLessonStatus[student.id] === "ATTENDED"
                    }
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
                          disabled={ts.student_in_class! >= 6}
                          key={ts.id}
                          value={ts.id.toString()}
                          className="select-item"
                        >
                          {ts.student_in_class
                            ? ts.label +
                              " - " +
                              "(" +
                              ts.student_in_class +
                              "/6)"
                            : ts.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator className="h-px bg-slate-200 my-3" />
                <small>
                  status :
                  <Badge
                    className={cn("text-xs ml-2", {
                      "bg-success-100 text-success-600":
                        replacedLessonStatus[student.id] === "ATTENDED",
                      "bg-orange-100 text-orange-600":
                        replacedLessonStatus[student.id] === "PENDING",
                      "bg-error-100 text-error-600":
                        replacedLessonStatus[student.id] === "ABSENT",
                    })}
                  >
                    {replacedLessonStatus[student.id] || "Not yet marked"}
                  </Badge>
                </small>
              </div>
            )}
          </TableCell>
        </TableRow>
      ))}
      <TableRow className="bg-slate-100">
        <TableCell className="align-middle" colSpan={6}>
          <div className="flex justify-between">
            <div className="flex items-center">
              Class Lesson :{" "}
              {(() => {
                const themeLesson = getThemeLesson(
                  calendarThemeLessonList,
                  classData.class_instance
                );
                return `${themeLesson.theme} - ${themeLesson.themeLesson}`;
              })()}
            </div>
            {isFutureDate ? (
              <div>
                <div className="bg-red-300 p-3 px-4 rounded-lg text-white font-semibold">
                  Not Today
                </div>
              </div>
            ) : (
              <div>
                <Button
                  className="bg-blue-900 text-white hover:bg-blue-700"
                  onClick={handleSubmit}
                  disabled={
                    !isSubmitEnabled || isSubmitting || allStudents.length === 0
                  }
                >
                  {isSubmitting ? "Marking..." : "Mark"}
                </Button>
              </div>
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ClassAttendanceRow;
