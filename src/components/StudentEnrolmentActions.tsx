"use client";
import {
  MoreHorizontal,
  BookOpen,
  Edit,
  Calendar,
  Clock,
  Trash,
  ArrowRight,
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

const StudentEnrolmentActions = ({
  enrolment_id,
  student_id,
  grade,
}: {
  enrolment_id: number;
  student_id: number;
  grade: number;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setDropdownOpen(false); // Close dropdown when opening dialog
    setDeleteDialogOpen(true);
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
          <DropdownMenuItem className="dropdown-menu-item">
            <BookOpen className="h-4 w-4" />
            <span>Lesson View</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="dropdown-menu-item">
            <Edit className="h-4 w-4" />
            <span>Edit Enrolment</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="dropdown-menu-item">
            <Calendar className="h-4 w-4" />
            <span>Reschedule Class</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="dropdown-menu-item">
            <Clock className="h-4 w-4" />
            <span>Extend Enrolment</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="dropdown-menu-item">
            <ArrowRight className="h-4 w-4" />
            <span>Advance Enrolment</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="dropdown-menu-item text-red-600"
            onClick={handleDeleteClick}
          >
            <Trash className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Dialog at root level */}
      <DeleteEnrolment
        type="enrolment"
        name={`Grade ${grade}`}
        id={enrolment_id}
        studentId={student_id}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
};

export default StudentEnrolmentActions;
