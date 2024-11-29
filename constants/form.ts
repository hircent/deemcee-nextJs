import * as z from "zod";
import { Control, FieldPath } from "react-hook-form";
import { title } from "process";

export const HolidayEntryType = [
  {
    id: 1,
    value: "centre holiday",
    label: "Centre Holiday",
  },
  {
    id: 2,
    value: "public holiday",
    label: "Public Holiday",
  },
  {
    id: 3,
    value: "event",
    label: "Event",
  },
  {
    id: 4,
    value: "other",
    label: "Other",
  },
];

export const branchFormSchema = z.object({
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

export const UpdateUserFormSchema = z.object({
  username: z.string().min(8, "Min 8 characters"),
  email: z.string().min(1, "Email is required").email(),
  address_line_1: z.string().min(1, "Address line 1 is required"),
  address_line_2: z.string(),
  address_line_3: z.string(),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  state: z.string().min(1, "State is required"),
});

export type UpdateUserFormValues = z.infer<typeof UpdateUserFormSchema>;

export type UpdateUserCustomInput = {
  control: Control<z.infer<typeof UpdateUserFormSchema>>;
  name: FieldPath<z.infer<typeof UpdateUserFormSchema>>;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

export const HolidayEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  entry_type: z.string().min(1, "Entry type is required"),
  start_datetime: z.string().min(1, "Start date is required"),
  end_datetime: z.string().min(1, "End date is required"),
});

export type HolidayEventValues = z.infer<typeof HolidayEventSchema>;

export const DeleteHolidayEventSchema = z.object({
  id: z.number().min(1, "Id is required"),
  name: z.string().min(1, "Name is required"),
  confirmName: z.string().min(1, "Confirm name is required"),
});

export type DeleteHolidayEventValues = z.infer<typeof DeleteHolidayEventSchema>;

export const CategoryFormSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  year: z.string().min(1, "Year is required"),
  is_active: z.string().min(1, "Check or uncheck"),
});

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;

export const GradeDataSchema = z.object({
  grade_level: z.string().min(1, "Grade level is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
});

export const ThemeDetailsSchema = z.object({
  name: z.string().min(2, "Lesson name must be at least 2 characters"),
  category: z.string().min(1, "Category must be chosen"),
  lesson_1: z.string().min(2, "Lesson one must be at least 2 characters"),
  lesson_2: z.string().min(2, "Lesson two must be at least 2 characters"),
  lesson_3: z.string().min(2, "Lesson three must be at least 2 characters"),
  lesson_4: z.string().min(2, "Lesson four must be at least 2 characters"),
});

export const GenerateThemeLessonSchema = z.object({
  year: z.string().min(4, "Year must be at least 4 characters"),
});

export type GenerateThemeLessonValues = z.infer<
  typeof GenerateThemeLessonSchema
>;
