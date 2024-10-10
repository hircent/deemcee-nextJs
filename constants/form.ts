import * as z from "zod";
import { Control, FieldPath } from 'react-hook-form'

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
  operation_date:z.string(),
  address_line_1: z.string(),
  address_line_2: z.string(),
  address_line_3: z.string(),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  state: z.string().min(1, "State is required"),
});

export type BranchFormValues = z.infer<typeof branchFormSchema>;

export type BranchCustomInput = {
  control: Control<z.infer<typeof branchFormSchema>>,
  name: FieldPath<z.infer<typeof branchFormSchema>>,
  label: string,
  type: string,
  placeholder: string
}