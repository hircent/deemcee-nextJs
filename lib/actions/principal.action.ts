"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getToken } from "./superadmin.action";

export async function getSuperadminList() {
  const token = getToken();

  try {
    const response = await fetch(`${process.env.API_URL}/branch/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
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
