import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const branchFormSchema = z.object({
    principal: z.object({
        id: z.number().min(1, "Principal is required"),
      }),
      branch_grade: z.object({
        id: z.number().min(1, "Branch grade is required"),
      }),
      business_name: z
        .string()
        .min(2, "Business name must be at least 2 characters"),
      display_name: z.string().min(2, "Display name must be at least 2 characters"),
      description: z.string(),
      business_reg_no: z
        .string()
        .min(1, "Business registration number is required"),
      address: z.object({
        address_line_1: z.string(),
        address_line_2: z.string(),
        address_line_3: z.string(),
        city: z.string().min(1, "City is required"),
        postcode: z.string().min(1, "Postcode is required"),
        state: z.string().min(1, "State is required"),
      }),
})

export type BranchFormValues = z.infer<typeof branchFormSchema>

