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
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState } from "react-dom";
import { PROMO_TYPE, SERVER_ACTION_STATE } from "@/constants/index";
import SubmitButton from "./SubmitButton";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { BranchSelectorProps } from "@/types/index";
import { getBranchSelector } from "@/lib/actions/branch.action";
import { CreateUpdatePromoCodeFormErrors } from "@/types/promocode";
import { createPromoCode } from "@/lib/actions/promocode.action";

const CreatePromoCode = () => {
  const [isForAllBranches, setForAllBranches] = useState<boolean>(false);
  const [branches, setBranches] = useState<BranchSelectorProps[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string | undefined>(
    undefined
  );
  const [selectedPromoType, setSelectedPromoType] = useState<
    string | undefined
  >(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [zoderror, setZodError] =
    useState<CreateUpdatePromoCodeFormErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [state, formAction] = useFormState(
    createPromoCode,
    SERVER_ACTION_STATE
  );

  useEffect(() => {
    setZodError(null);
    const fetchBranchData = async () => {
      const branchData = await getBranchSelector();
      setBranches(branchData);
    };
    fetchBranchData();
  }, []);

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
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="group p-2 rounded-md bg-yellow-2"
        >
          <Plus size={18} className="text-red-600 group-hover:text-gray-600" />{" "}
          Add
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[800px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-4">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Create Promo Code
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Separator className="h-px bg-slate-200" />

        <form
          action={formAction}
          className="space-y-4 sm:space-y-6 mt-4"
          ref={formRef}
        >
          <div className="grid grid-cols-3 gap-4 items-center">
            <Input
              type="hidden"
              name="for_all_branches"
              value={isForAllBranches ? "true" : "false"}
            />
            <Label htmlFor="status" className="text-sm sm:text-base">
              For All Branches
            </Label>
            <div className="col-span-2 flex items-center space-x-2">
              <Checkbox
                id="status"
                defaultChecked={isForAllBranches}
                className={cn("h-5 w-5 border-gray-300", {
                  " text-green-400 ": isForAllBranches,
                })}
                onClick={() => {
                  setForAllBranches(!isForAllBranches);
                }}
              />
              <Label htmlFor="status" className="text-sm text-gray-600">
                Yes
              </Label>
            </div>
          </div>

          {!isForAllBranches && (
            <div className="space-y-2">
              <Input
                type="hidden"
                name="branch"
                value={selectedBranch}
                id="branch"
              />
              <Label htmlFor="promo_type">
                Or Apply to : <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setSelectedBranch(value)}>
                <SelectTrigger id="promo_type">
                  <SelectValue placeholder="Select a branch" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  {branches.map((v) => (
                    <SelectItem
                      key={v.id}
                      value={v.id.toString()}
                      className="select-item"
                    >
                      {v.display_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <small className="text-red-500">{zoderror?.branch?.[0]}</small>
            </div>
          )}

          <Separator className="h-px bg-slate-200 my-2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">
                Code <span className="text-red-500">*</span>
              </Label>
              <Input id="code" name="code" placeholder="PROMO2025" />
              <small className="text-red-500">{zoderror?.code?.[0]}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">
                Discount Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                name="amount"
                placeholder="123"
                type="number"
              />
              <small className="text-red-500">{zoderror?.amount?.[0]}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min_purchase_amount">
                Minimum Purchase Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                id="min_purchase_amount"
                name="min_purchase_amount"
                type="number"
                placeholder="2000"
              />
              <small className="text-red-500">
                {zoderror?.min_purchase_amount?.[0]}
              </small>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">
                Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="200"
                name="quantity"
              />
              <small className="text-red-500">{zoderror?.quantity?.[0]}</small>
            </div>

            <div className="space-y-2">
              <Input
                value={selectedPromoType}
                type="hidden"
                name="promo_type"
                id="promo_type"
              />
              <Label htmlFor="promo_type">
                Promo Type <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={setSelectedPromoType}>
                <SelectTrigger id="promo_type">
                  <SelectValue placeholder="Select promo type" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  {PROMO_TYPE.map((v) => (
                    <SelectItem
                      key={v.id}
                      value={v.value}
                      className="select-item"
                    >
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <small className="text-red-500">
                {zoderror?.promo_type?.[0]}
              </small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo_type">
                Expired At <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                placeholder="Expired At"
                id="expired_at"
                name="expired_at"
              />
              <small className="text-red-500">
                {zoderror?.expired_at?.[0]}
              </small>
            </div>
          </div>
          <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
            <SubmitButton label="Create" submitLabel="Creating" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromoCode;
