import React, { useState } from "react";
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
const RejectAdvancement = ({
  grade,
  moreThan12Lessons,
  open,
  onOpenChange,
}: {
  grade: number;
  moreThan12Lessons: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[500px] h-max max-h-[80vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Advance Enrolment</DialogTitle>
            <DialogDescription>
              {moreThan12Lessons ? (
                <p>
                  You can only advance if you have less than 12 lessons left
                </p>
              ) : (
                <p>Your grade 6 cannot be advanced</p>
              )}
            </DialogDescription>
            <div className="flex justify-center items-center"></div>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default RejectAdvancement;
