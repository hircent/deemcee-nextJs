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
import { camelCase } from "@/lib/utils";
import {
  CreateUserCustomInput,
  CreateUserFormSchema,
  CreateUserFormValues,
} from "@/constants/form";
import { getUserDetails } from "@/lib/actions/user.actions";

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

export function EditUser({ type, id }: EditProps) {
  const [isLoading, setLoading] = useState<boolean>(true);
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

  const getUser = async () => {
    try {
      const userData = await getUserDetails({ id, type });
      form.reset({
        username: userData.username,
        email: userData.email,
        password: "asd",
        confirm_password: "asd",
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

  const onSubmit = async (formData: FormData) => {
    // console.log(formData)
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
      <DialogContent className="w-full max-w-[1000px] h-[90vh] overflow-y-auto custom-scrollbar bg-white">
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
        )}
      </DialogContent>
    </Dialog>
  );
}
