"use client";

import React from "react";
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
import { useToast } from "./ui/use-toast";
import { Plus } from "lucide-react";
import { camelCase, cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  CreateUserCustomInput,
  CreateUserFormSchema,
  CreateUserFormValues,
} from "@/constants/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/lib/actions/user.actions";

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  required,
}: CreateUserCustomInput) => {
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

const Create = ({ type }: { type: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      city: "",
      postcode: "",
      state: "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const res = await createUser(formData, type);

      if (res.success) {
        toast({
          title: "Success",
          description: `New ${type} has been created successfully.`,
          duration: 2000,
          className: cn("bottom-0 left-0 bg-success-100"),
        });
        form.reset();
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: `${res.msg}`,
          duration: 4000,
          className: cn("bottom-0 left-0 bg-error-100"),
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
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
          <Plus
            size={18}
            className="text-red-600 group-hover:text-gray-600 mr-1"
          />
          Add
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-full max-w-[1000px] h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Create {camelCase(type)}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={onSubmit} className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <CustomInput
                    control={form.control}
                    name="username"
                    label="Username"
                    placeholder="Enter your Username"
                    type="text"
                    required={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your Email"
                    type="text"
                    required={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your Password"
                    type="password"
                    required={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="Confirm Your Password"
                    type="password"
                    required={true}
                  />
                </div>
              </div>

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

export default Create;
