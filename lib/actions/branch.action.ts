"use server";

import {
  BranchListFilterProps,
  GetBranchDetailProps,
  DeleteBranchProps,
  BranchDetailProps,
  PrincipalsAndBranchGrade,
} from "@/types/index";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getBranchList(params: BranchListFilterProps) {
  const { page, searchQuery } = params;
  const token = getToken();

  let url = `${process.env.API_URL}/branch/list`;

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

export async function deleteBranch({
  name,
  confirmName,
  id,
}: DeleteBranchProps) {
  const token = getToken();
  if (name !== confirmName) {
    throw new Error(
      "Names do not match! Please enter the exact name to confirm deletion."
    );
  }

  try {
    const response = await fetch(`${process.env.API_URL}/branch/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (response.status == 404) {
      throw new Error(`Branch ${response.statusText}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    revalidatePath("/branch");
  } catch (error) {
    throw error;
  }
}

export async function getBranchDetails({
  id,
}: GetBranchDetailProps): Promise<BranchDetailProps> {
  const token = getToken();

  try {
    const response = await fetch(
      `${process.env.API_URL}/branch/details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
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

export async function getAllPrincipalAndBranchGrade(): Promise<
  PrincipalsAndBranchGrade | undefined
> {
  const token = getToken();
  try {
    const response = await fetch(
      `${process.env.API_URL}/branch/principals/branch_grade`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    if (response.status == 403) {
      return undefined;
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function createBranch(formData: FormData) {
  const token = getToken();

  try {
    // const response = await fetch(`${process.env.API_URL}/branch/create`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token?.value}`,
    //   },
    // });
    setTimeout(() => {
      console.log({ success: true });
    }, 3000);

    return { success: true };
  } catch (error) {
    console.log(error);
  }
}

function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("deemceeAuth");

  if (!token) {
    redirect("/sign-in");
  }

  return token;
}
