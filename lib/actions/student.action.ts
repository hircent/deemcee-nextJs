"use server";

import { GetResponseProps, ListProps, STATE } from "@/types/index";
import { getToken } from "./user.actions";
import { cookies } from "next/headers";
import {
  StudentData,
  StudentFormErrors,
  StudentListFilterProps,
  StudentProps,
} from "@/types/student";
import { revalidatePath } from "next/cache";
import {
  DeleteStudentSchema,
  StudentFormSchema,
  UpdateStudentFormSchema,
} from "@/constants/form";

export async function getStudentList(
  params: StudentListFilterProps
): Promise<ListProps<StudentProps>> {
  const { page, searchQuery } = params;
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/student/list`;

  if (searchQuery) {
    url = `${url}?q=${searchQuery}`;
  }

  if (page && page > 1) {
    url = `${url}?page=${page}`;
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

    const data = Object.fromEntries(formData);
    const validated = StudentFormSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as StudentFormErrors,
        msg: "Validation Failed",
      };
    }

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
