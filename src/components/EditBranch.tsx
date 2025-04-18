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
import { Input } from "@/components/ui/input";
import { getBranchDetails, updateBranch } from "@/lib/actions/branch.action";
import { EditProps } from "@/types/index";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { branchFormSchema, BranchFormValues } from "@/constants/form";
import { Label } from "@radix-ui/react-dropdown-menu";
import { BRANCH_GRADE, REGIONS } from "@/constants/index";

export function EditBranch({ type, id }: EditProps) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("1");
  const [principalID, setPrincipalID] = useState("");
  const [branchGradeID, setBranchGradeID] = useState("");
  const { toast } = useToast();

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

  async function getBranch() {
    setLoading(true);
    try {
      const [branchData] = await Promise.all([
        getBranchDetails({ id }),
        // getSelectFromPrincipalAndBranchGrade(), // Fetch select options alongside branch details
      ]);

      form.reset({
        name: branchData?.name || "",
        business_name: branchData?.business_name || "",
        display_name: branchData?.display_name || "",
        description: branchData?.description || "",
        business_reg_no: branchData?.business_reg_no || "",
        operation_date: branchData?.operation_date || "",
        address_line_1: branchData?.address.address_line_1 || "",
        address_line_2: branchData?.address.address_line_2 || "",
        address_line_3: branchData?.address.address_line_3 || "",
        city: branchData?.address.city || "",
        postcode: branchData?.address.postcode || "",
        state: branchData?.address.state || "",
      });
      setCountry(branchData.country.id.toString());
      setPrincipalID(branchData.principal.id.toString());
      setBranchGradeID(branchData.branch_grade.toString());
    } catch (error) {
      console.error("Failed to fetch branch details:", error);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(formData: FormData) {
    formData.append("principal", principalID);
    formData.append("branch_grade", branchGradeID);
    formData.append("country", country);
    try {
      await updateBranch(formData, id);
      toast({
        title: "Success",
        description: `Edited.`,
        duration: 2000,
        className: cn("bottom-0 left-0 bg-success-100"),
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to update branch:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            getBranch();
            setOpen(true);
          }}
          className="group p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Pencil
            size={18}
            className="text-gray-500 group-hover:text-blue-500 transition-colors"
          />{" "}
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-full max-w-[1000px] h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Edit Branch
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Make changes to your branch details here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading...</p>
          </div>
        ) : (
          <Form {...form}>
            <form action={onSubmit} className="space-y-6">
              <div className="grid gap-6">
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

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">
                        Branch Grade
                      </Label>
                      <Select
                        value={branchGradeID}
                        onValueChange={setBranchGradeID}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Grade" />
                        </SelectTrigger>
                        <SelectContent className="select-content">
                          {BRANCH_GRADE.map((bg) => (
                            <SelectItem
                              key={bg.value}
                              value={bg.id.toString()}
                              className="select-item"
                            >
                              {bg.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a State" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            {REGIONS.map((country) => (
                              <SelectItem
                                key={country.value}
                                value={country.id.toString()}
                                className="select-item"
                              >
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
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
                <Button
                  type="submit"
                  className="bg-[#000] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving.." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
