import React, { useEffect, useState } from "react";
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
import Loader from "./Loader";
import { cn, dateIsBeforeToday, getCategoryByGrade } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { getClasslots } from "@/lib/actions/class.action";
import { ClassSlotData } from "@/types/index";

export const EnrolmentReschedule = ({
  id,
  grade,
  open,
  onOpenChange,
}: {
  id: number;
  grade: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [classSlots, setClassSlots] = useState<ClassSlotData[]>([]);
  const [selectedclassSlot, setSelectedclassSlot] = useState("");
  const [selectPlaceholder, setSelectPlaceholder] = useState(
    "Please select a date"
  );

  const [isSelectorDisabled, setIsSelectorDisabled] = useState<boolean>(true);

  useEffect(() => {
    const categoryName = getCategoryByGrade(grade);
    setCategory(categoryName);
  }, [grade]);

  const handleDateChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (dateIsBeforeToday(date)) {
      toast({
        title: "Reschedule Date Error",
        description: "Reschedule date cannot be in the PAST.",
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
      return;
    }

    const classSlots = await getClasslots({
      date,
      category,
    });

    if (classSlots.length === 0) {
      setSelectPlaceholder("No available class slots");
    } else {
      setSelectPlaceholder("Select a class slot");
    }
  };
  console.log({ category });

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
                  Select Day
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
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
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <form action="">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="classSlot" className="font-medium">
                      Select Class Slot
                    </Label>
                    <Select
                      value={selectedclassSlot}
                      onValueChange={setSelectedclassSlot}
                      disabled={isSelectorDisabled}
                    >
                      <SelectTrigger id="classSlot" className="w-full h-10">
                        <SelectValue placeholder={selectPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {classSlots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id.toString()}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <SubmitButton
                      label="Reschedule"
                      submitLabel="Rescheduling"
                    />
                  </DialogFooter>
                </form>
              )}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
