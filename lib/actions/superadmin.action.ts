"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ListProps, TypeUserProps, UserListFilterProps } from "@/types/index";


export async function getUserListByType(params:UserListFilterProps): Promise<ListProps<TypeUserProps>> {
  const { type ,page, searchQuery } = params;
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/users/${type}/list`;

  if (searchQuery) {
    url = `${url}?q=${searchQuery}`;
  }

  if (page && page > 1) {
    url = `${url}?page=${page}`;
  }
  
  try {
    const response = await fetch(
      url,
      {
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
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("deemceeAuth");

  if (!token) {
    redirect("/sign-in");
  }

  return token;
}
