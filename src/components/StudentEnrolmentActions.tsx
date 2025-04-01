"use client";
import {
  MoreHorizontal,
  BookOpen,
  Edit,
  Calendar,
  Clock,
  Trash,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteEnrolment } from "./DeleteEnrolment";
import { ViewEnrolmentLesson } from "./ViewEnrolmentLesson";
import { EnrolmentReschedule } from "./EnrolmentReschedule";
import { EditEnrolment } from "./EditEnrolment";
import { ExtendEnrolment } from "./ExtendEnrolment";
import { AdvanceEnrolment } from "./AdvanceEnrolment";
import { Enrolment } from "@/types/student";
import { formatDateTime } from "@/lib/utils";
import { RevertExtension } from "./RevertExtension";

const StudentEnrolmentActions = ({
  enrolment,
  studentId,
  extensions,
}: {
  enrolment: Enrolment;
  studentId: number;
  extensions: number;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [lessonViewOpen, setLessonViewOpen] = useState<boolean>(false);
  const [rescheduleViewOpen, setRescheduleViewOpen] = useState<boolean>(false);
  const [extendEnrolmentViewOpen, setExtendEnrolmentViewOpen] =
    useState<boolean>(false);
  const [revertEnrolmentViewOpen, setRevertEnrolmentViewOpen] =
    useState<boolean>(false);
  const [advanceEnrolmentViewOpen, setAdvanceEnrolmentViewOpen] =
    useState<boolean>(false);
  const [editEnrolmentViewOpen, setEditEnrolmentViewOpen] =
    useState<boolean>(false);

  const handleDialogClick = (setDialog: (open: boolean) => void) => {
    setDropdownOpen(false); // Close dropdown when opening dialog
    setDialog(true);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-yellow-2"
          align="end"
          alignOffset={-15}
          sideOffset={5}
        >
          <DropdownMenuItem
            className="dropdown-menu-item"
            onClick={() => handleDialogClick(setLessonViewOpen)}
          >
            <BookOpen className="h-4 w-4" />
            <span>Lesson View</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="dropdown-menu-item"
            onClick={() => handleDialogClick(setEditEnrolmentViewOpen)}
          >
            <Edit className="h-4 w-4" />
            <span>Edit Enrolment</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="dropdown-menu-item"
            onClick={() => handleDialogClick(setRescheduleViewOpen)}
          >
            <Calendar className="h-4 w-4" />
            <span>Change Class Slot</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="dropdown-menu-item"
            onClick={() => handleDialogClick(setExtendEnrolmentViewOpen)}
          >
            <Clock className="h-4 w-4" />
            <span>Extend Enrolment</span>
          </DropdownMenuItem>

          {extensions > 0 && (
            <DropdownMenuItem
              className="dropdown-menu-item"
              onClick={() => handleDialogClick(setRevertEnrolmentViewOpen)}
            >
              <CornerDownLeft className="h-4 w-4" />
              <span>Revert Extension</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="dropdown-menu-item"
            onClick={() => handleDialogClick(setAdvanceEnrolmentViewOpen)}
          >
            <ArrowRight className="h-4 w-4" />
            <span>Advance Enrolment</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="dropdown-menu-item text-red-600"
            onClick={() => handleDialogClick(setDeleteDialogOpen)}
          >
            <Trash className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewEnrolmentLesson
        id={enrolment.id}
        open={lessonViewOpen}
        onOpenChange={setLessonViewOpen}
      />

      <EditEnrolment
        id={enrolment.id}
        status={enrolment.status}
        open={editEnrolmentViewOpen}
        onOpenChange={setEditEnrolmentViewOpen}
      />

      <EnrolmentReschedule
        id={enrolment.id}
        studentId={studentId}
        grade={enrolment.grade}
        open={rescheduleViewOpen}
        onOpenChange={setRescheduleViewOpen}
      />

      <ExtendEnrolment
        id={enrolment.id}
        open={extendEnrolmentViewOpen}
        onOpenChange={setExtendEnrolmentViewOpen}
      />

      <RevertExtension
        id={enrolment.id}
        open={revertEnrolmentViewOpen}
        onOpenChange={setRevertEnrolmentViewOpen}
      />

      <AdvanceEnrolment
        id={enrolment.id}
        end_date={formatDateTime(new Date(enrolment.end_date)).dateOnly}
        remaining_lessons={enrolment.remaining_lessons}
        grade={enrolment.grade}
        open={advanceEnrolmentViewOpen}
        onOpenChange={setAdvanceEnrolmentViewOpen}
      />

      {/* Delete Dialog at root level */}
      <DeleteEnrolment
        type="enrolment"
        name={`Grade ${enrolment.grade}`}
        id={enrolment.id}
        studentId={studentId}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
};

export default StudentEnrolmentActions;
