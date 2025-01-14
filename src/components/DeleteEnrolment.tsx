"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";
import { DeleteEnrolmentProps, DeleteFormErrors } from "@/types/student";
import { deleteEnrolment } from "@/lib/actions/student.action";

interface ExtendedDeleteEnrolmentProps extends DeleteEnrolmentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteEnrolment({
  type,
  name,
  id,
  studentId,
  open,
  onOpenChange,
}: ExtendedDeleteEnrolmentProps) {
  const [zoderror, setZodError] = useState<DeleteFormErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(
    deleteEnrolment,
    SERVER_ACTION_STATE
  );

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });
      formRef.current?.reset();
      onOpenChange(false);
      router.refresh();
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }
  }, [state, toast, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[400px] sm:max-w-[425px] bg-white rounded-md">
          <DialogHeader>
            <DialogTitle>Delete {type}</DialogTitle>
            <DialogDescription>
              Are you sure to delete {type}{" "}
              <span className="font-bold">{name}</span>?
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} ref={formRef}>
            <Input id="name" type="hidden" name="name" value={name} />
            <Input id="id" type="hidden" name="id" value={id} />
            <Input
              id="studentId"
              type="hidden"
              name="studentId"
              value={studentId}
            />
            <div className="grid gap-4 py-4 border-b-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmName" className="text-left">
                  Name: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmName"
                  name="confirmName"
                  className="col-span-3"
                />
              </div>
            </div>
            <small className="text-slate-400">
              {`Please key in the ${type} to confirm delete.`}
            </small>
            <DialogFooter>
              <Button type="submit" className="bg-red-500 text-white">
                Delete
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
