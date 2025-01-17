"use server";
import {
  ClassFormErrors,
  ClassListData,
  GetTimeslotProps,
} from "@/types/class";
import { getToken } from "./user.actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  GetResponseProps,
  ListProps,
  SearchParamsFilterProps,
  STATE,
  TimeslotData,
} from "@/types/index";
import { ClassFormSchema, DeleteClassSchema } from "@/constants/form";
import { formatDateTime } from "../utils";

export async function getClassList(
  params: SearchParamsFilterProps
): Promise<ListProps<ClassListData>> {
  const { page } = params;

  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/class/list`;

  if (page && page > 1) {
    url = `${url}?page=${page}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch class data " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch class data " + error);
  }
}

export async function createClass(
  _prevState: STATE<ClassFormErrors>,
  formData: FormData
): Promise<STATE<ClassFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = ClassFormSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as ClassFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(`${process.env.API_URL}/class/create`, {
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

    revalidatePath("/class/manage");
    return { success: true, msg: "Category has been created" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function deleteClass(
  _prevState: STATE<ClassFormErrors>,
  formData: FormData
): Promise<STATE<ClassFormErrors>> {
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

    const validated = DeleteClassSchema.safeParse(data);
    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as ClassFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/class/delete/${data.id}`,
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

    revalidatePath("/class/manage");
    return { success: true, msg: `Class ${obj.name} is deleted` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function editClass(
  _prevState: STATE<ClassFormErrors>,
  formData: FormData
): Promise<STATE<ClassFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = ClassFormSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as ClassFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/class/update/${data.id}`,
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

    revalidatePath("/class/manage");
    return { success: true, msg: `Class is updated` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function getClassDetails(id: number): Promise<ClassListData> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/class/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch calendar data " + response.statusText);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

function getCategory(grade: number) {
  switch (grade) {
    case 1:
    case 2:
      return "Kiddo";
    case 3:
    case 4:
      return "Kids";
    case 5:
    case 6:
      return "Superkids";
  }
}

export async function getTimeslots({
  date,
  grade,
}: GetTimeslotProps): Promise<TimeslotData[]> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  const category = getCategory(grade);

  try {
    const response = await fetch(
      `${process.env.API_URL}/timeslot/list?date=${date}&category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch calendar data " + response.statusText);
    }

    const data: GetResponseProps<TimeslotData> = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}
