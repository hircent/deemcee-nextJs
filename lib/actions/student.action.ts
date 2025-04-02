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
  EnrolmentExtensionError,
  EnrolmentFormErrors,
  EnrolmentLessonProps,
  StudentData,
  StudentFormErrors,
  StudentListFilterProps,
  StudentProps,
} from "@/types/student";
import { revalidatePath } from "next/cache";
import {
  AdvanceEnrolmentSchema,
  DeleteEnrolmentSchema,
  DeleteStudentSchema,
  EnrolmentFormSchema,
  ExtendEnrolmentSchema,
  StudentFormSchema,
  UpdateStudentFormSchema,
} from "@/constants/form";
import { ClassLessonTodayStudentList } from "@/types/class";

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

    const validated = StudentFormSchema.safeParse(fdata);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as StudentFormErrors,
        msg: "Validation Failed",
      };
    }

    const { parent_username, parent_email, ...rest } = fdata;

    const data = {
      ...rest,
      parent_details: {
        username: parent_username,
        email: parent_email,
      },
    };

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

    const id = data.id;
    delete data.id;

    const response = await fetch(`${process.env.API_URL}/enrolment/create`, {
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

    revalidatePath(`/student/${id}`);

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
      return { success: false, msg: response.statusText };
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
  const { is_active, status, name } = params;
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/student/enrolment/list?is_active=${is_active}&status=${status}`;

  if (name) {
    url = `${url}&name=${name}`;
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
