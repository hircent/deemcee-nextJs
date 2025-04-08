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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "./SubmitButton";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { useFormState } from "react-dom";
import {
  updateStudentRemark,
  getStudentRemark,
} from "@/lib/actions/student.action";
import { StudentRemark, StudentRemarkError } from "@/types/student";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FileWarning } from "lucide-react";
import Loader from "./Loader";
import { set } from "zod";

export const EditNote = ({ id, name }: { id: number; name: string }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [remark, setRemark] = useState<StudentRemark | undefined>(undefined);
  const [zoderror, setZodError] = useState<StudentRemarkError | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(
    updateStudentRemark,
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
      setOpen(false);
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }
  }, [state, toast, router]);

  useEffect(() => {
    if (!open) {
      setLoading(true);
    }

    const getRemark = async () => {
      try {
        const remark = await getStudentRemark(id);
        setRemark(remark);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch remark",
          className: cn(`bottom-0 left-0`, "bg-error-100"),
          duration: 3000,
        });
      }
    };

    getRemark();
  }, [open, id, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="p-2"
        >
          <FileWarning size={14} className="text-indigo-500" />{" "}
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[400px] sm:max-w-[425px] bg-white rounded-md">
          <DialogHeader>
            <DialogTitle>Edit Note for {name}</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <Loader />
          ) : (
            <form action={formAction} ref={formRef}>
              <Input id="id" type="hidden" name="id" value={id} />
              <div className="space-y-4 border-b-2">
                <div className="flex flex-col">
                  <Label htmlFor="remark" className="text-left mb-4">
                    Remark:
                  </Label>
                  <Textarea
                    id="remark"
                    name="remark"
                    className="col-span-3"
                    defaultValue={remark?.remark || ""}
                  />
                </div>
                <small className="text-red-500">{zoderror?.remark?.[0]}</small>
              </div>
              <DialogFooter>
                <SubmitButton label="Save" submitLabel="Saving" />
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
