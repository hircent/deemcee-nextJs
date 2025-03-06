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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";
import { DeletePromoCodeProps, PromoCodeFormErrors } from "@/types/promocode";
import { deletePromoCode } from "@/lib/actions/promocode.action";
import { useRouter } from "next/navigation";

export function DeletePromoCode({ name, id }: DeletePromoCodeProps) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [zoderror, setZodError] = useState<PromoCodeFormErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(
    deletePromoCode,
    SERVER_ACTION_STATE
  );

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });

      const timer = setTimeout(() => {
        router.refresh();
      }, 200);

      return () => clearTimeout(timer);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Trash2
            size={18}
            className="text-gray-500 group-hover:text-red-500 transition-colors"
          />
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[400px] sm:max-w-[425px] bg-white rounded-md">
        <DialogHeader>
          <DialogTitle>Delete Promo Code</DialogTitle>
          <DialogDescription>
            Are you sure to delete <span className="font-bold">{name}</span>?
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef}>
          <Input id="name" type="hidden" name="name" value={name} />
          <Input id="id" type="hidden" name="id" value={id} />
          <div className="grid gap-4 pb-4 border-b-2">
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
            <small className="text-red-500">{zoderror?.confirmName?.[0]}</small>
          </div>
          <small className="text-slate-400">
            {`Please key in the ${name} to confirm delete.`}
          </small>
          <DialogFooter className="mt-4">
            <Button type="submit" className="bg-red-500 text-white">
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
