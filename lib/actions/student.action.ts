"use server";

import {
  EnrolmentDataProps,
  GetResponseProps,
  ListProps,
  STATE,
} from "@/types/index";
import { getToken } from "./user.actions";
import { cookies } from "next/headers";
import {
  AdvanceEnrolmentError,
  DeleteFormErrors,
  EnrolmentDetails,
  EnrolmentExtensionError,
  EnrolmentFormErrors,
  EnrolmentLessonProps,
  StudentData,
  StudentFormErrors,
  StudentListFilterProps,
  StudentProps,
  StudentRemark,
  StudentRemarkError,
  UpdateEnrolmentError,
} from "@/types/student";
import { revalidatePath } from "next/cache";
import {
  AdvanceEnrolmentSchema,
  DeleteEnrolmentSchema,
  DeleteStudentSchema,
  EnrolmentFormSchema,
  ExtendEnrolmentSchema,
  StudentFormSchema,
  UpdateEnrolmentSchema,
  UpdateStudentFormSchema,
  UpdateStudentNoteSchema,
} from "@/constants/form";
import { ClassLessonTodayStudentList } from "@/types/class";
import { InvoiceData } from "@/types/payment";

export async function getStudentList(
  params: StudentListFilterProps
): Promise<ListProps<StudentProps>> {
  const { page, searchQuery, filter } = params;
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/student/list`;

  // Prepare query parameters
  const queryParams: string[] = [];

  if (searchQuery) {
    queryParams.push(`q=${encodeURIComponent(searchQuery)}`);
  }

  if (page && page > 1) {
    queryParams.push(`page=${page}`);
  }

  if (filter) {
    queryParams.push(`filter=${encodeURIComponent(filter)}`);
  }

  // If there are any query parameters, append them to the URL
  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${id?.toString()}`,
      },
      // next:{
      //     revalidate:3300
      // },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteStudent(
  _prevState: STATE<StudentFormErrors>,
  formData: FormData
): Promise<STATE<StudentFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const obj = Object.fromEntries(formData);
    const data = {
      ...obj,
      id: Number(formData.get("id")), // Convert id to number
    };

    if (obj.name !== obj.confirmName) {
      return {
        error: true,
        msg: "Name must be excatly the same.",
      };
    }

    const validated = DeleteStudentSchema.safeParse(data);
    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as StudentFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/student/delete/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, msg: response.statusText };
    }

    revalidatePath("/deusers/student");
    return { success: true, msg: `Student ${obj.name} is deleted` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function createStudent(
  _prevState: STATE<StudentFormErrors>,
  formData: FormData
): Promise<STATE<StudentFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const fdata = Object.fromEntries(formData);
    console.log({
      fdata,
      dob: fdata.parent_dob,
    });
    const validated = StudentFormSchema.safeParse(fdata);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as StudentFormErrors,
        msg: "Validation Failed",
      };
    }

    const {
      parent_first_name,
      parent_last_name,
      parent_email,
      parent_address_1,
      parent_address_2,
      parent_address_3,
      parent_city,
      parent_state,
      parent_postcode,
      parent_phone,
      parent_dob,
      parent_occupation,
      ...rest
    } = fdata;

    const data = {
      ...rest,
      parent_details: {
        username: `${fdata.parent_first_name || ""}${
          fdata.parent_last_name || ""
        }`,
        email: parent_email,
        first_name: parent_first_name,
        last_name: parent_last_name,
      },
      address_details: {
        address_line_1: parent_address_1,
        address_line_2: parent_address_2,
        address_line_3: parent_address_3,
        city: parent_city,
        state: parent_state,
        postcode: parent_postcode,
      },
      profile: {
        phone: parent_phone,
        dob: parent_dob || null,
        occupation: parent_occupation,
      },
    };

    console.log({
      data,
    });
    const response = await fetch(`${process.env.API_URL}/student/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath("/deusers/student");
    return { success: true, msg: "Student is created" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function createEnrolment(
  _prevState: STATE<EnrolmentFormErrors>,
  formData: FormData
): Promise<STATE<EnrolmentFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);

    const validated = EnrolmentFormSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as EnrolmentFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath(`/student/${data.student}`);

    return { success: true, msg: "Enrolment has been created" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function editStudent(
  _prevState: STATE<StudentFormErrors>,
  formData: FormData
): Promise<STATE<StudentFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = UpdateStudentFormSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as StudentFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/student/update/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath(`/student/${data.id}`);
    return { success: true, msg: "Student is edited" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function getStudentById(id: number): Promise<StudentData> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  try {
    const response = await fetch(
      `${process.env.API_URL}/student/details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteEnrolment(
  _prevState: STATE<DeleteFormErrors>,
  formData: FormData
): Promise<STATE<DeleteFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const obj = Object.fromEntries(formData);
    const data = {
      ...obj,
      id: Number(formData.get("id")), // Convert id to number
    };

    if (obj.name !== obj.confirmName) {
      return {
        error: true,
        msg: "Name must be excatly the same.",
      };
    }

    const validated = DeleteEnrolmentSchema.safeParse(data);
    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as DeleteFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/delete/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    return { success: true, msg: `Enrolment ${obj.name} is deleted` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function getEnrolmentLesson(
  enrolment_id: number
): Promise<EnrolmentLessonProps[]> {
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/student/enrolment/${enrolment_id}/lessons/list`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${id?.toString()}`,
      },
      // next:{
      //     revalidate:3300
      // },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: GetResponseProps<EnrolmentLessonProps> = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getEnrolmentDetailForUpdateView(
  id: number
): Promise<EnrolmentDetails> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function updateEnrolment(
  _prevState: STATE<UpdateEnrolmentError>,
  formData: FormData
): Promise<STATE<UpdateEnrolmentError>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = UpdateEnrolmentSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as UpdateEnrolmentError,
        msg: "Validation Failed",
      };
    }
    const id = data.id;
    delete data.id;

    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath(`/student`);
    return { success: true, msg: `Enrolment has been updated` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function extendEnrolment(
  _prevState: STATE<EnrolmentExtensionError>,
  formData: FormData
): Promise<STATE<EnrolmentExtensionError>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = ExtendEnrolmentSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten()
          .fieldErrors as EnrolmentExtensionError,
        msg: "Validation Failed",
      };
    }

    if (data.confirm.toString().toLowerCase() !== "yes") {
      return {
        error: true,
        msg: "Kindly key in Yes to confirm extend",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/${data.id}/extend`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath(`/student`);
    return { success: true, msg: `Enrolment has been extended` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function revertExtendedEnrolment(
  _prevState: STATE<EnrolmentExtensionError>,
  formData: FormData
): Promise<STATE<EnrolmentExtensionError>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = ExtendEnrolmentSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten()
          .fieldErrors as EnrolmentExtensionError,
        msg: "Validation Failed",
      };
    }

    if (data.confirm.toString().toLowerCase() !== "yes") {
      return {
        error: true,
        msg: "Kindly key in Yes to confirm revert",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/${data.id}/revert`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath(`/student`);
    return { success: true, msg: `Extended enrolment has been reverted` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function getShouldAttendStudentList(
  today: string
): Promise<ClassLessonTodayStudentList[]> {
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/class/attendance/list?date=${today}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${id?.toString()}`,
      },
      next: {
        revalidate: 0, // This forces Next.js to revalidate the data on every request
        tags: ["calendar-theme-lesson-list-by-date"], // You can use this tag to manually revalidate
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function advanceEnrolment(
  _prevState: STATE<AdvanceEnrolmentError>,
  formData: FormData
): Promise<STATE<AdvanceEnrolmentError>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);

    const modifiedData = {
      ...data,
      is_early_advance: data.is_early_advance === "true",
    };

    const validated = AdvanceEnrolmentSchema.safeParse(modifiedData);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as AdvanceEnrolmentError,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/${data.id}/advance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath(`/student`);
    return { success: true, msg: "Advance Enrolment is successful" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function getEnrolmentList(params: EnrolmentDataProps) {
  const { is_active, status, name, page } = params;
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/student/enrolment/list?is_active=${is_active}&status=${status}`;

  if (name) {
    url = `${url}&name=${name}`;
  }

  if (page && page > 1) {
    url = `${url}&page=${page}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${id?.toString()}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function getInvoiceDetailForPrint(
  id: number
): Promise<InvoiceData> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const response = await fetch(
      `${process.env.API_URL}/paymemt-invoice-details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getStudentRemark(id: number): Promise<StudentRemark> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const response = await fetch(
      `${process.env.API_URL}/students/remark/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStudentRemark(
  _prevState: STATE<StudentRemarkError>,
  formData: FormData
): Promise<STATE<StudentRemarkError>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = UpdateStudentNoteSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as StudentRemarkError,
        msg: "Validation Failed",
      };
    }
    const id = data.id;
    delete data.id;

    const response = await fetch(
      `${process.env.API_URL}/students/remark/${id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath(`/deusers/enrolment`);
    return { success: true, msg: `Remark has been updated` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}
