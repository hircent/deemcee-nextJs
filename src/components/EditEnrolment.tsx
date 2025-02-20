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
import SubmitButton from "./SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import {
  ENROLMENT_STATUS_CHOICES,
  SERVER_ACTION_STATE,
} from "@/constants/index";

export const EditEnrolment = ({
  id,
  status,
  open,
  onOpenChange,
}: {
  id: number;
  status: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [enrolmentStatus, setEnrolmentStatus] = useState<string>(status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[600px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Edit Enrolment</DialogTitle>
            <DialogDescription>Viewing details for enrolment</DialogDescription>
          </DialogHeader>

          <form className="space-y-2">
            <Input type="hidden" name="id" value={id} />
            <div className="flex gap-4 justify-center items-center">
              <Input type="hidden" name="status" value={enrolmentStatus} />
              <Label htmlFor="status">Status</Label>
              <Select
                value={enrolmentStatus}
                onValueChange={setEnrolmentStatus}
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="select-content">
                  {ENROLMENT_STATUS_CHOICES.map((esc) => (
                    <SelectItem
                      key={esc.value}
                      value={esc.value}
                      className="select-item"
                    >
                      {esc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <SubmitButton label="Save" submitLabel="Saving" />
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
