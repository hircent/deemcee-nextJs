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
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useFormState } from "react-dom";
import { createHoliday } from "@/lib/actions/calendar.action";

const SERVER_ACTION_STATE = {
  zodErr:null,
  success:null,
  error:null,
}

const CreateHolidayEvent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [holidayEventType,setHolidayEventType] = useState<string>("")
  const { toast } = useToast();

  const submitEvent = async (formData:FormData)=>{
    formData.append("event_type",holidayEventType)
    const data = Object.fromEntries(formData)
    console.log(data)
  }

  const [state , formAction] = useFormState(createHoliday,SERVER_ACTION_STATE)

  useEffect(()=>{},[state])
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
        
        <form action={formAction} className="space-y-4 sm:space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm sm:text-base">Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter event title"
              className="w-full text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter event description"
              className="w-full min-h-[100px] text-sm sm:text-base"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_datetime" className="text-sm sm:text-base">Start Date <span className="text-red-500">*</span></Label>
              <Input
                id="start_datetime"
                name="start_datetime"
                type="date"
                className="w-full text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_datetime" className="text-sm sm:text-base">End Date <span className="text-red-500">*</span></Label>
              <Input
                id="end_datetime"
                name="end_datetime"
                type="date"
                className="w-full text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="entry_type" className="text-sm sm:text-base">Event Type <span className="text-red-500">*</span></Label>
            <Select
              value={holidayEventType}
              onValueChange={(value)=>{
                setHolidayEventType(value)
              }}
            >
              <SelectTrigger className="w-full text-sm sm:text-base">
                <SelectValue placeholder="Select an Event" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="public" className="text-sm sm:text-base cursor-pointer hover:bg-yellow-6">Public Holiday</SelectItem>
                <SelectItem value="company" className="text-sm sm:text-base cursor-pointer hover:bg-yellow-6">Company Event</SelectItem>
                <SelectItem value="team" className="text-sm sm:text-base cursor-pointer hover:bg-yellow-6">Team Event</SelectItem>
                <SelectItem value="personal" className="text-sm sm:text-base cursor-pointer hover:bg-yellow-6">Personal Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
            <Button type="submit" className="w-full sm:w-auto bg-[#000] text-white text-sm sm:text-base px-6 py-2">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateHolidayEvent
