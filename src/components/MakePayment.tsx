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
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import SubmitButton from "./SubmitButton";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CreateUpdatePromoCodeFormErrors } from "@/types/promocode";
import { editPromoCode } from "@/lib/actions/promocode.action";
import Loader from "./Loader";

const MakePayment = ({ id }: { id: number }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [zoderror, setZodError] =
    useState<CreateUpdatePromoCodeFormErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [state, formAction] = useFormState(editPromoCode, SERVER_ACTION_STATE);

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
      setZodError(null);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-2 text-yellow-500 hover:cursor-pointer">
          <Clock size={18} />
          <span>Pay</span>
        </div>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[800px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-4">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Make Payment
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click pay when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Separator className="h-px bg-slate-200" />
        {isLoading ? (
          <Loader />
        ) : (
          <form
            action={formAction}
            className="space-y-4 sm:space-y-6 mt-4"
            ref={formRef}
          >
            <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
              <SubmitButton label="Update" submitLabel="Updating" />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MakePayment;
