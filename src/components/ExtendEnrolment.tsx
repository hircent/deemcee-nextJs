import React, { useEffect, useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "./SubmitButton";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { useFormState } from "react-dom";
import { extendEnrolment } from "@/lib/actions/student.action";
import { EnrolmentExtensionError } from "@/types/student";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

export const ExtendEnrolment = ({
  id,
  open,
  onOpenChange,
}: {
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [zoderror, setZodError] = useState<EnrolmentExtensionError | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(
    extendEnrolment,
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
  }, [state, toast, onOpenChange, router]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[400px] sm:max-w-[425px] bg-white rounded-md">
          <DialogHeader>
            <DialogTitle>Extend Enrolment</DialogTitle>
            <DialogDescription>
              Are you sure to extend enrolment?
            </DialogDescription>
          </DialogHeader>

          <form action={formAction} ref={formRef}>
            <Input id="id" type="hidden" name="id" value={id} />
            <div className="grid gap-4 py-4 border-b-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirm" className="text-left">
                  Confirm: <span className="text-red-500">*</span>
                </Label>
                <Input id="confirm" name="confirm" className="col-span-3" />
              </div>
            </div>
            <small className="text-slate-400">
              Please key in the Yes to confirm extend.
            </small>

            <DialogFooter>
              <SubmitButton label="Extend" submitLabel="Extending" />
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
