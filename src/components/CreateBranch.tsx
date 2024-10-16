"use client";

import { CreateType } from "@/types/index";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import {
  BranchCustomInput,
  branchFormSchema,
  BranchFormValues,
} from "@/constants/form";
import { BranchGrade, Principal } from "@/types/index";
import {
  createBranch,
  getAllPrincipalAndBranchGrade,
} from "@/lib/actions/branch.action";
import { useToast } from "./ui/use-toast";
import { camelCase, cn } from "@/lib/utils";

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  required,
}: BranchCustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className="w-full"
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};
const CreateBranch = (params: CreateType) => {
  const { type } = params;
  const [open, setOpen] = useState<boolean>(false);
  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [branchGrades, setBranchGrades] = useState<BranchGrade[]>([]);
  const [principalID, setPrincipalID] = useState("");
  const [branchGradeID, setBranchGradeID] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    async function getSelectFromPrincipalAndBranchGrade() {
      try {
        const data = await getAllPrincipalAndBranchGrade();
        if (data) {
          setBranchGrades(data.branch_grades);
          setPrincipals(data.principals);
        }
      } catch (error) {
        console.error("Failed to fetch select options:", error);
      }
    }

    if (open) {
      getSelectFromPrincipalAndBranchGrade();
    }
  }, [open]);

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      name: "",
      business_name: "",
      display_name: "",
      description: "",
      business_reg_no: "",
      operation_date: "",
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      city: "",
      postcode: "",
      state: "",
    },
  });

  const submitForm = async (formData: FormData) => {
    formData.append("principal", principalID);
    formData.append("branch_grade", branchGradeID);
    try {
      await createBranch(formData);
      toast({
        title: "Success",
        description: `New Branch has been created successfully.`,
        duration: 2000,
        className: cn("bottom-0 left-0 bg-success-100"),
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        duration: 4000,
        className: cn("bottom-0 left-0 bg-error-100"),
      });
    }
  };
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
          {camelCase(type)}
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-full max-w-[1000px] h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Create Branch
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={submitForm} className="space-y-6">
            <div className="grid gap-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <CustomInput
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Enter your Branch Name"
                    type="text"
                    required={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="business_name"
                    label="Business Name"
                    placeholder="Enter your Business Name"
                    type="text"
                    required={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="display_name"
                    label="Display Name"
                    placeholder="Enter your Display Name"
                    type="text"
                    required={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="business_reg_no"
                    label="Registration Number"
                    placeholder="Enter your Registration Number"
                    type="text"
                    required={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Enter your Description"
                    type="text"
                  />
                  <CustomInput
                    control={form.control}
                    name="operation_date"
                    label="Operation Date"
                    placeholder="Enter your Operation Date"
                    type="date"
                    required={true}
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address Details</h3>
                <div className="grid gap-4">
                  <CustomInput
                    control={form.control}
                    name="address_line_1"
                    label="Address Line 1"
                    placeholder="Enter your Address Line 1"
                    type="text"
                    required={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="address_line_2"
                    label="Address Line 2"
                    placeholder="Enter your Address Line 2"
                    type="text"
                  />
                  <CustomInput
                    control={form.control}
                    name="address_line_3"
                    label="Address Line 3"
                    placeholder="Enter your Address Line 3"
                    type="text"
                  />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <CustomInput
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="Enter your City"
                      type="text"
                      required={true}
                    />
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Enter your State"
                      type="text"
                      required={true}
                    />
                    <CustomInput
                      control={form.control}
                      name="postcode"
                      label="Postcode"
                      placeholder="Enter your Postcode"
                      type="text"
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-4 sm:gap-0">
              <Button type="submit" className="bg-[#000] text-white">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBranch;
