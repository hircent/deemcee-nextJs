"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getToken } from "./superadmin.action";
import { cookies } from "next/headers";

export async function getPrincipalList() {
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;
  try {
    const response = await fetch(`${process.env.API_URL}/users/principal/list`, {
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
