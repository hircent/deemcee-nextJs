"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "./ui/use-toast";
import SubmitButton from "./SubmitButton";
import {
  CLASS_TYPES,
  DAYS_OF_WEEK,
  SERVER_ACTION_STATE,
} from "@/constants/index";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";
import { createClass } from "@/lib/actions/class.action";
import { ClassFormErrors } from "@/types/class";

const ClassesForm = ({ type }: { type: string }) => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [day, setDay] = useState<string | undefined>(undefined);
  const [zoderror, setZodError] = useState<ClassFormErrors | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(createClass, SERVER_ACTION_STATE);

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
      setZodError(null);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="group p-2 bg-gray-100 rounded-md hover:bg-yellow-2"
        >
          <Plus size={18} className="text-red-600 group-hover:text-gray-600" />{" "}
          Add
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-full max-h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Create New Class Schedule
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Fill in the class schedule details below.
          </DialogDescription>
        </DialogHeader>

        <form
          action={formAction}
          className="space-y-4 sm:space-y-6"
          ref={formRef}
        >
          <div className="flex flex-col space-y-6">
            {/* Class Type */}
            <div>
              <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="name" className="text-sm sm:text-base">
                  Class Type <span className="text-red-500">*</span>
                </Label>
                <Input id="name" type="hidden" name="name" value={category} />
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-full text-sm sm:text-base col-span-2">
                    <SelectValue placeholder="Select class type" />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    {CLASS_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="select-item"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <small className="text-red-500">{zoderror?.name?.[0]}</small>
            </div>

            {/* Day Selection */}
            <div>
              <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="day" className="text-sm sm:text-base">
                  Day <span className="text-red-500">*</span>
                </Label>
                <Input id="name" type="hidden" name="day" value={day} />
                <Select onValueChange={(value) => setDay(value)}>
                  <SelectTrigger className="w-full text-sm sm:text-base col-span-2">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    {DAYS_OF_WEEK.map((day) => (
                      <SelectItem key={day} value={day} className="select-item">
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <small className="text-red-500">{zoderror?.day?.[0]}</small>
            </div>

            {/* Start Time */}
            <div>
              <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="start_time" className="text-sm sm:text-base">
                  Start Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="start_time"
                  type="time"
                  name="start_time"
                  className="w-full text-sm sm:text-base col-span-2"
                />
              </div>
              <small className="text-red-500">
                {zoderror?.start_date?.[0]}
              </small>
            </div>

            {/* End Time */}
            <div>
              <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="end_time" className="text-sm sm:text-base">
                  End Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="end_time"
                  type="time"
                  name="end_time"
                  className="w-full text-sm sm:text-base col-span-2"
                />
              </div>
              <small className="text-red-500">{zoderror?.end_time?.[0]}</small>
            </div>

            {/* Start Date */}
            <div>
              <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="start_date" className="text-sm sm:text-base">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  name="start_date"
                  className="w-full text-sm sm:text-base col-span-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <small className="text-red-500">
                {zoderror?.start_date?.[0]}
              </small>
            </div>
          </div>

          <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
            <SubmitButton label="Save" submitLabel="Saving" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClassesForm;
