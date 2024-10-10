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
import { Plus ,Calendar as CalendarIcon} from "lucide-react";
import { branchFormSchema, BranchFormValues } from "@/constants/form";
import { BranchGrade, Principal } from "@/types/index";
import {
  createBranch,
  getAllPrincipalAndBranchGrade,
} from "@/lib/actions/branch.action";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

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
    getSelectFromPrincipalAndBranchGrade();
  }, []);

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      principal: {
        id: 0, // or null, depending on your needs
      },
      branch_grade: {
        id: 0, // or null, depending on your needs
      },
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
    console.log({formData});
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
      console.log(error);
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
          {type.toUpperCase()}
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
              {/* Principal and Branch Grade Section */}

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Branch Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="principal.id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Principal</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(Number(value));
                            setPrincipalID(value);
                          }}
                          value={field.value ? String(field.value) : undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a principal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white max-h-[200px] overflow-y-auto">
                            {principals.map((principal) => (
                              <SelectItem
                                key={principal.id}
                                value={String(principal.id)}
                                className="hover:bg-slate-300 cursor-pointer"
                              >
                                {principal.username}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="branch_grade.id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Grade</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(Number(value));
                            setBranchGradeID(value);
                          }}
                          value={field.value ? String(field.value) : undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a branch grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white max-h-[200px] overflow-y-auto">
                            {branchGrades.map((grade) => (
                              <SelectItem
                                key={grade.id}
                                value={String(grade.id)}
                                className="hover:bg-slate-300 cursor-pointer"
                              >
                                {grade.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="display_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="business_reg_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operation_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operation Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address Details</h3>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="address_line_1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address_line_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address_line_3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 3</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postcode</FormLabel>
                          <FormControl>
                            <Input {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
