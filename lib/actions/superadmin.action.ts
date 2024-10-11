"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ListProps, SuperadminProps } from "@/types/index";

export async function getSuperadminList(): Promise<ListProps<SuperadminProps>> {
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  try {
    const response = await fetch(
      `${process.env.API_URL}/users/superadmin/list`,
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
