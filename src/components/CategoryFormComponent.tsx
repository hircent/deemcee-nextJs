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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { camelCase, cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { useFormState } from "react-dom";
import { createCategory } from "@/lib/actions/structure.actions";
import { CategoryFormErrors } from "@/types/structure";

const CategoryForm = ({type}:{type:string}) => {
    const [category,setCategory] = useState<string>("KIDDOS");
    const [isActive, setIsActive] = useState<boolean>(true)
    const [zoderror, setZodError] = useState<CategoryFormErrors | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [state, formAction] = useFormState(createCategory, SERVER_ACTION_STATE);

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
            className: cn(
              `bottom-0 left-0`,
              "bg-success-100"
            ),
            duration: 3000,
          });
        }
        if (state.error) {
          toast({
            title: "Error",
            description: state.msg,
            className: cn(
              `bottom-0 left-0`,
              "bg-error-100"
            ),
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
          className="group p-2 bg-gray-100 rounded-md hover:bg-yellow-2"
        >
          <Plus size={18} className="text-red-600 group-hover:text-gray-600" />{" "}
          Add
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-full max-h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            {`Create ${camelCase(type)}`}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4 sm:space-y-6" ref={formRef}>
            <div className="flex flex-col space-y-6">
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <Label htmlFor="name" className="text-sm sm:text-base">
                        Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="hidden"
                          name="name"
                          value={category}
                        />
                        <Select
                          value={category}
                          onValueChange={(value) => setCategory(value)}
                        >
                        <SelectTrigger className="w-full text-sm sm:text-base col-span-2">
                          <SelectValue placeholder="KIDDOS" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem
                            value="KIDDOS"
                            className="cursor-pointer hover:bg-yellow-9"
                          >
                            KIDDOS
                          </SelectItem>
                          <SelectItem
                            value="KIDS"
                            className="cursor-pointer hover:bg-yellow-9"
                          >
                            KIDS
                          </SelectItem>
                          <SelectItem
                            value="SUPERKIDS"
                            className="cursor-pointer hover:bg-yellow-9"
                          >
                            SUPERKIDS
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <small className="text-red-500">{zoderror?.name?.[0]}</small>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <Label htmlFor="year" className="text-sm sm:text-base">
                            Year <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="year"
                            type="number"
                            name="year"
                            placeholder="Enter category year"
                            className="w-full text-sm sm:text-base col-span-2"
                        />
                    </div>
                    <small className="text-red-500">{zoderror?.year?.[0]}</small>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <Input type="hidden" name="is_active" value={isActive ? "true" : "false"}/>
                        <Label htmlFor="status" className="text-sm sm:text-base">
                            Status <span className="text-red-500">*</span>
                        </Label>
                        <div className="col-span-2 flex items-center space-x-2">
                            <Checkbox
                                id="status"
                                defaultChecked={isActive}
                                className={cn("h-5 w-5 border-gray-300", {
                                    " text-green-400 ": isActive
                                })}
                                onClick={()=>{setIsActive(!isActive)}}
                            />
                            <Label htmlFor="status" className="text-sm text-gray-600">
                                Active
                            </Label>
                        </div>
                    </div>
                    <small className="text-red-500">{zoderror?.is_active}</small>
                </div>
            </div>
            <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
                <SubmitButton label='Save' submitLabel="Saving"/>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
