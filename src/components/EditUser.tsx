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
import { camelCase, cn } from "@/lib/utils";
import {
  UpdateUserCustomInput,
  UpdateUserFormSchema,
  UpdateUserFormValues,
} from "@/constants/form";
import { getUserDetails, updateUser } from "@/lib/actions/user.actions";
import { z } from "zod";

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  required,
}: UpdateUserCustomInput) => {
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

export function EditUser({ type, id }: EditProps) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      username: "",
      email: "",
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      city: "",
      postcode: "",
      state: "",
    },
  });

  const getUser = async () => {
    try {
      const userData = await getUserDetails({ id });
      form.reset({
        username: userData.username,
        email: userData.email,
        address_line_1: userData.address.address_line_1,
        address_line_2: userData.address.address_line_2,
        address_line_3: userData.address.address_line_3,
        city: userData.address.city,
        postcode: userData.address.postcode,
        state: userData.address.state,
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const onSubmit = async (formData: z.infer<typeof UpdateUserFormSchema>) => {
    setSubmitting(true);
    try {
      await updateUser({ id, type, formData });
      setSubmitting(false);
      setOpen(false);
      toast({
        title: "Success",
        description: `Edited.`,
        duration: 2000,
        className: cn("bottom-0 left-0 bg-success-100"),
      });
    } catch (error) {
      setSubmitting(false);
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
            getUser();
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
      <DialogContent className="w-full max-w-[1000px] h-auto overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Edit {camelCase(type)}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Make changes to your details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading...</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Button
                  type="submit"
                  className="bg-[#000] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving" : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
