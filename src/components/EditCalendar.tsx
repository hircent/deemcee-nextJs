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
import { BranchGrade, EditProps, Principal } from "@/types/index";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";

export function EditCalendar({ type, id }: EditProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
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
          <form action="">form</form>
      </DialogContent>
    </Dialog>
  );
}
