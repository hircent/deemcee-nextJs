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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { EditProps } from "@/types/index";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import {
  editCalendar,
  getCalendarDetails,
} from "@/lib/actions/calendar.action";
import { CalendarData, HolidayEventError } from "@/types/calendar";
import { HolidayEntryType } from "@/constants/form";
import { cn, extractDate } from "@/lib/utils";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import SubmitButton from "./SubmitButton";

export function EditCalendar({ type, id }: EditProps) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [zoderror, setZodError] = useState<HolidayEventError | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarData | undefined>(
    undefined
  );
  const [holidayEventType, setHolidayEventType] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(editCalendar, SERVER_ACTION_STATE);

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

  const getCalendar = async () => {
    try {
      const data = await getCalendarDetails(id);
      setCalendarData(data);
      setHolidayEventType(data.entry_type);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch calendar details:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
            getCalendar();
          }}
          className="group p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Pencil
            size={18}
            className="text-gray-500 group-hover:text-blue-500 transition-colors"
          />{" "}
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[1000px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            {`Edit ${type}`}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {`Make changes to your ${type} details here. Click save when
            you're done.`}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <form
            action={formAction}
            ref={formRef}
            className="space-y-4 sm:space-y-6"
          >
            <Input type="hidden" id="id" name="id" defaultValue={id} />
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm sm:text-base">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter event title"
                defaultValue={calendarData?.title}
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
                defaultValue={calendarData?.description}
                className="w-full min-h-[100px] text-sm sm:text-base"
              />
              <small className="text-red-500">
                {zoderror?.description?.[0]}
              </small>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="start_datetime"
                  className="text-sm sm:text-base"
                >
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="start_datetime"
                  name="start_datetime"
                  type="date"
                  defaultValue={extractDate(calendarData?.start_datetime)}
                  className="w-full text-sm sm:text-base"
                  readOnly
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
                  defaultValue={extractDate(calendarData?.end_datetime)}
                  className="w-full text-sm sm:text-base"
                  readOnly
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
              <Input
                type="hidden"
                name="entry_type"
                defaultValue={holidayEventType}
                value={holidayEventType}
              />
              <Select
                defaultValue={calendarData?.entry_type}
                onValueChange={(value) => {
                  setHolidayEventType(value);
                }}
              >
                <SelectTrigger className="w-full text-sm sm:text-base">
                  <SelectValue placeholder="Select an Event" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  {HolidayEntryType.map((v) => (
                    <SelectItem
                      key={v.id}
                      value={v.value}
                      className="text-sm sm:text-base select-item"
                    >
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <small className="text-red-500">
                {zoderror?.entry_type?.[0]}
              </small>
            </div>

            <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
              <SubmitButton label="Save" submitLabel="Saving" />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
