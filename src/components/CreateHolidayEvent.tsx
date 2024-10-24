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
import { useToast } from "./ui/use-toast";
import { camelCase, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

const CreateHolidayEvent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
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
          Event
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-full max-w-[1000px] h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        contect
      </DialogContent>
    </Dialog>
  )
}

export default CreateHolidayEvent
