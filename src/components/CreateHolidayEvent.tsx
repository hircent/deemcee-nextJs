"use client";
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
import { useToast } from "./ui/use-toast";
import { camelCase, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useFormState } from "react-dom";
import { createHoliday } from "@/lib/actions/calendar.action";
import { HolidayEventError } from "@/types/calendar";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { HolidayEntryType } from "@/constants/form";

const CreateHolidayEvent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [holidayEventType, setHolidayEventType] = useState<string>("");
  const [zoderror, setZodError] = useState<HolidayEventError | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [state, formAction] = useFormState(createHoliday, SERVER_ACTION_STATE);

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
      toast({
        title: "Success",
        description: state.msg,
        className: cn(
          `bottom-0 left-0`,
          "bg-success-100"
        ),
        duration: 3000,
      });
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(
          `bottom-0 left-0`,
          "bg-error-100"
        ),
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
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[1000px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-4">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Create Event
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form
          action={formAction}
          className="space-y-4 sm:space-y-6 mt-4"
          ref={formRef}
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm sm:text-base">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter event title"
              className="w-full text-sm sm:text-base"
            />
            <small className="text-red-500">{zoderror?.title?.[0]}</small>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm sm:text-base">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter event description"
              className="w-full min-h-[100px] text-sm sm:text-base"
            />
            <small className="text-red-500">{zoderror?.description?.[0]}</small>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_datetime" className="text-sm sm:text-base">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="start_datetime"
                name="start_datetime"
                type="date"
                className="w-full text-sm sm:text-base"
              />
              <small className="text-red-500">
                {zoderror?.start_datetime?.[0]}
              </small>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_datetime" className="text-sm sm:text-base">
                End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="end_datetime"
                name="end_datetime"
                type="date"
                className="w-full text-sm sm:text-base"
              />
              <small className="text-red-500">
                {zoderror?.end_datetime?.[0]}
              </small>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="entry_type" className="text-sm sm:text-base">
              Event Type <span className="text-red-500">*</span>
            </Label>
            <Input type="hidden" name="entry_type" value={holidayEventType} />
            <Select
              value={holidayEventType}
              onValueChange={(value) => {
                setHolidayEventType(value);
              }}
            >
              <SelectTrigger className="w-full text-sm sm:text-base">
                <SelectValue placeholder="Select an Event" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {HolidayEntryType.map((v)=>(
                    <SelectItem key={v.id} value={v.value} className="text-sm sm:text-base cursor-pointer hover:bg-yellow-6">
                      {v.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <small className="text-red-500">{zoderror?.entry_type?.[0]}</small>
          </div>

          <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#000] text-white text-sm sm:text-base px-6 py-2"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHolidayEvent;
