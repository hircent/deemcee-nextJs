import * as z from "zod";
import { Control, FieldPath } from "react-hook-form";

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

export const ClassFormSchema = z.object({
  name: z.string().min(2, "Category name is required"),
  label: z.string().min(1, "Label is required"),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  day: z.string().min(1, "Day is required"),
});

export const DeleteClassSchema = z.object({
  id: z.number().min(1, "Id is required"),
  name: z.string().min(1, "Name is required"),
  confirmName: z.string().min(1, "Confirm name is required"),
});

export const StudentFormSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "First name is required"),
    fullname: z.string().min(1, "Full name is required"),
    gender: z.string().min(1, "Gender is required"),
    dob: z.string().min(1, "Date of birth is required"),
    school: z.string().min(1, "School is required"),
    deemcee_starting_grade: z.string().min(1, "Starting grade is required"),
    start_date: z.string().min(1, "Enrolment date is required"),
    parent: z.string().optional(),
    parent_username: z.string().optional(),
    parent_email: z.string().optional(),
    timeslot: z.string().optional(),
    // referral_channel: z.string().optional(),
    // referral_name: z.string().optional(),
    // starter_kits: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    // If parent doesn't exist or is empty
    if (!data.parent) {
      // Check parent_username
      if (!data.parent_username) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parent username is required",
          path: ["parent_username"],
        });
      }
      // Check parent_email
      if (!data.parent_email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parent email is required",
          path: ["parent_email"],
        });
      }
    }
  });

export const UpdateStudentFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  fullname: z.string().min(1, "Full name is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of birth is required"),
  school: z.string().min(1, "School is required"),
  deemcee_starting_grade: z.string().min(1, "Starting grade is required"),
  enrolment_date: z.string().min(1, "Enrolment date is required"),
  status: z.string().min(1, "Status is required"),
});

export const DeleteStudentSchema = z.object({
  id: z.number().min(1, "Id is required"),
  name: z.string().min(1, "Name is required"),
  confirmName: z.string().min(1, "Confirm name is required"),
});

export const DeleteEnrolmentSchema = z.object({
  studentId: z.string().min(1, "Id is required"),
  id: z.number().min(1, "Id is required"),
  name: z.string().min(1, "Name is required"),
  confirmName: z.string().min(1, "Confirm name is required"),
});

export const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    new_password: z
      .string()
      .min(1, "New password is required")
      .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
      .regex(/[a-z]/, "New password must contain at least one lowercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "New password must contain at least one special character"
      ),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"], // Specify where the error should appear
  });

export const UpdateUserFullDetailsSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().min(2, "Min 2 characters"),
  email: z.string().min(1, "Email is required").email(),
  address_line_1: z.string().min(1, "Address line 1 is required"),
  address_line_2: z.string().optional(),
  address_line_3: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  state: z.string().min(1, "State is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().optional(),
  ic_number: z.string().optional(),
  occupation: z.string().optional(),
  spouse_name: z.string().optional(),
  spouse_phone: z.string().optional(),
  spouse_occupation: z.string().optional(),
  no_of_children: z.string().optional(),
  personal_email: z.string().email().optional().or(z.literal("")),
  bank_name: z.string().optional(),
  bank_account_name: z.string().optional(),
  bank_account_number: z.string().optional(),
});

export const ExtendEnrolmentSchema = z.object({
  confirm: z.string().min(1, "Confirm name is required"),
  id: z.string().min(1, "Id is required"),
});

export const VideoAssignmentFormSchema = z.object({
  student_id: z.string().min(1, "Student ID is required"),
  theme: z.string().min(1, "Theme is required"),
  video_url: z.string().min(1, "Video URL is required"),
  submission_date: z.string().min(1, "Submission date is required"),
});

export const RescheduleClassSchema = z.object({
  classroom: z.string().min(1, "Classroom is required"),
});

export const AdvanceEnrolmentSchema = z.object({
  id: z.string().min(1, "Enrolement ID is required"),
  grade: z.string().min(1, "Grade is required"),
  is_early_advance: z.boolean(),
  start_date: z.string().min(1, "Date is required"),
  classroom: z.string().min(1, "Classroom is required"),
});
