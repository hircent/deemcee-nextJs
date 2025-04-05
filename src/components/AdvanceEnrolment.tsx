import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "./SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, getCategoryByGrade } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { Checkbox } from "./ui/checkbox";
import { TimeslotData } from "@/types/index";
import { getClasslots } from "@/lib/actions/class.action";
import RejectAdvancement from "./RejectAdvancement";
import { advanceEnrolment } from "@/lib/actions/student.action";
import { AdvanceEnrolmentError } from "@/types/student";

export const AdvanceEnrolment = ({
  id,
  end_date,
  remaining_lessons,
  grade,
  extension,
  open,
  onOpenChange,
}: {
  id: number;
  end_date: string;
  remaining_lessons: number;
  grade: number;
  extension: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [classSlots, setClassSlots] = useState<TimeslotData[]>([]);
  const [selectedclassSlot, setSelectedclassSlot] = useState("");
  const [selectPlaceholder, setSelectPlaceholder] = useState(
    "Please select a date"
  );
  const [selectedDay, setSelectedDay] = useState("");
  const [isSelectorDisabled, setIsSelectorDisabled] = useState<boolean>(true);
  const [zoderror, setZodError] = useState<AdvanceEnrolmentError | null>(null);
  const [state, formAction] = useFormState(
    advanceEnrolment,
    SERVER_ACTION_STATE
  );

  const handleDateChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    const next_category = getCategoryByGrade(grade + 1);
    setSelectedDay(date);
    setClassSlots([]);
    setSelectPlaceholder("Loading...");
    setSelectedclassSlot("");
    const classSlots = await getClasslots({
      date,
      category: next_category,
    });

    if (classSlots.length === 0) {
      setSelectPlaceholder("No available class slots");
      setIsSelectorDisabled(true);
    } else {
      setSelectPlaceholder("Select a class slot");
      setClassSlots(classSlots);
      setIsSelectorDisabled(false);
    }
  };

  const handleEarlyAdvance = () => {
    if (remaining_lessons > 12) {
      toast({
        title: "Error",
        description: "You cannot advance more than 12 lessons",
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
      setIsActive(false);
    } else {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
      onOpenChange(false);
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }
  }, [state, toast]);

  if (grade > 5 || remaining_lessons > 12) {
    return (
      <RejectAdvancement
        grade={grade}
        open={open}
        moreThan12Lessons={remaining_lessons > 12}
        onOpenChange={onOpenChange}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[600px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Advance Enrolment</DialogTitle>
            <DialogDescription>
              Are you sure you about advancing from Grade {grade} to Grade{" "}
              {grade + 1}?
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" action={formAction} ref={formRef}>
            <Input type="hidden" name="id" value={id} />
            <Input type="hidden" name="grade" value={grade + 1} />
            <Input
              type="hidden"
              name="is_early_advance"
              value={isActive.toString()}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
              {extension === 0 && (
                <div className="flex items-center col-span-full gap-4">
                  <Label htmlFor="is_early_advance" className="font-medium">
                    Early Advance :
                  </Label>
                  <Checkbox
                    id="is_early_advance"
                    name="is_early_advance"
                    defaultChecked={false}
                    value={isActive.toString()}
                    checked={isActive}
                    className={cn("h-5 w-5 border-gray-300", {
                      " text-green-400 ": isActive,
                    })}
                    onClick={handleEarlyAdvance}
                  />
                </div>
              )}

              <div className="flex flex-col space-y-2">
                <Label htmlFor="remaining_lessons" className="font-medium">
                  Current Remaining Lessons
                </Label>
                <Input
                  id="remaining_lessons"
                  type="number"
                  value={remaining_lessons}
                  className="w-full h-10"
                  readOnly
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="new_category" className="font-medium">
                  Next Category
                </Label>
                <Input
                  id="new_category"
                  value={getCategoryByGrade(grade + 1)}
                  className="w-full h-10"
                  readOnly
                />
              </div>

              <div className="flex flex-col space-y-2 col-span-full">
                <Label htmlFor="start_date" className="font-medium">
                  Choose a Date
                </Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={selectedDay}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                />
                <small className="text-red-500">
                  {zoderror?.start_date?.[0]}
                </small>
              </div>

              <div className="flex flex-col space-y-2 col-span-full">
                <Input
                  type="hidden"
                  name="classroom"
                  value={selectedclassSlot}
                />
                <Label htmlFor="classSlot" className="font-medium">
                  Select Class Slot
                </Label>
                <Select
                  value={selectedclassSlot}
                  onValueChange={setSelectedclassSlot}
                  disabled={isSelectorDisabled}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder={selectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    {classSlots.map((slot) => (
                      <SelectItem
                        key={slot.id}
                        value={slot.id.toString()}
                        className="select-item"
                        disabled={slot.student_in_class! >= 6}
                      >
                        {slot.label} - {"(" + slot.student_in_class + "/6)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <small className="text-red-500">{zoderror?.classroom}</small>
              </div>
            </div>
            <DialogFooter>
              <SubmitButton label="Advance" submitLabel="Advancing" />
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
