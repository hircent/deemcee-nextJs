import * as z from "zod";
import { Control, FieldPath } from "react-hook-form";

export const branchFormSchema = z.object({
  principal: z.number().min(1, "Principal is required"),
  branch_grade: z.number().min(1, "Branch grade is required"),
  name: z.string().min(2, "Business name must be at least 2 characters"),
  business_name: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  display_name: z.string().min(2, "Display name must be at least 2 characters"),
  description: z.string(),
  business_reg_no: z
    .string()
    .min(1, "Business registration number is required"),
  operation_date: z.string().min(1, "Operation date must choose"),
  address_line_1: z.string().min(1, "Address line 1 is required"),
  address_line_2: z.string(),
  address_line_3: z.string(),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  state: z.string().min(1, "State is required"),
});

export type BranchFormValues = z.infer<typeof branchFormSchema>;

export type BranchCustomInput = {
  control: Control<z.infer<typeof branchFormSchema>>;
  name: FieldPath<z.infer<typeof branchFormSchema>>;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

export const CreateUserFormSchema = z
  .object({
    username: z.string().min(8, "Min 8 characters"),
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(8, "Min 8 characters"),
    confirm_password: z.string().min(8, "Min 8 characters"),
    address_line_1: z.string().min(1, "Address line 1 is required"),
    address_line_2: z.string(),
    address_line_3: z.string(),
    city: z.string().min(1, "City is required"),
    postcode: z.string().min(1, "Postcode is required"),
    state: z.string().min(1, "State is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type CreateUserFormValues = z.infer<typeof CreateUserFormSchema>;

export type CreateUserCustomInput = {
  control: Control<z.infer<typeof CreateUserFormSchema>>;
  name: FieldPath<z.infer<typeof CreateUserFormSchema>>;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
};
