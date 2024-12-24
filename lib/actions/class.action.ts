"use server";
import { ClassListData } from "@/types/class";
import { getToken } from "./user.actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ListProps, SearchParamsFilterProps } from "@/types/index";

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
