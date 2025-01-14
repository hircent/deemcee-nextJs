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
import { Loader2 } from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import SubmitButton from "./SubmitButton";

export const AdvanceEnrolment = ({
  id,
  open,
  onOpenChange,
}: {
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[600px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Lesson Details</DialogTitle>
            <DialogDescription>
              Viewing lesson details for enrolment
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            )}
          </div>

          <DialogFooter>
            <SubmitButton label="Reschedule" submitLabel="Rescheduling" />
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
