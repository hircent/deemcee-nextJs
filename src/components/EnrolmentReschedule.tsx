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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "./SubmitButton";
import { cn, getCategoryByGrade } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import {
  getClasslots,
  rescheduleEnrolmentClass,
} from "@/lib/actions/class.action";
import { TimeslotData } from "@/types/index";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { RescheduleFormErrors } from "@/types/class";

export const EnrolmentReschedule = ({
  id,
  studentId,
  grade,
  open,
  onOpenChange,
}: {
  id: number;
  studentId: number;
  grade: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const [category, setCategory] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState("");
  const [zoderror, setZodError] = useState<RescheduleFormErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(
    rescheduleEnrolmentClass,
    SERVER_ACTION_STATE
  );
  const [classSlots, setClassSlots] = useState<TimeslotData[]>([]);
  const [selectedclassSlot, setSelectedclassSlot] = useState("");
  const [selectPlaceholder, setSelectPlaceholder] = useState(
    "Please select a date"
  );

  const [isSelectorDisabled, setIsSelectorDisabled] = useState<boolean>(true);

  const handleDateChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    setSelectedDay(date);
    setClassSlots([]);
    setSelectPlaceholder("Loading...");
    setSelectedclassSlot("");
    const classSlots = await getClasslots({
      date,
      category,
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

  useEffect(() => {
    const categoryName = getCategoryByGrade(grade);
    setCategory(categoryName);
  }, [grade]);

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[600px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Enrolment Reschedule</DialogTitle>
            <DialogDescription>
              Choose a date to reschedule the enrolment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="date" className="font-medium">
                  Select Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDay}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full h-10"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="category" className="font-medium">
                  Enrolment Category
                </Label>
                <Input
                  id="category"
                  type="text"
                  name="category"
                  value={category}
                  readOnly
                  className="w-full h-10 bg-gray-50"
                />
              </div>
            </div>

            <div className="w-full">
              <form action={formAction} ref={formRef}>
                <Input type="hidden" name="enrolment_id" value={id} />
                <Input type="hidden" name="student_id" value={studentId} />
                <div className="flex flex-col space-y-2">
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
                </div>
                <small className="text-red-500">{zoderror?.classroom}</small>
                <DialogFooter>
                  <SubmitButton label="Reschedule" submitLabel="Rescheduling" />
                </DialogFooter>
              </form>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
