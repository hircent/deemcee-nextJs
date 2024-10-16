"use server";

import {
  BranchListFilterProps,
  GetBranchDetailProps,
  DeleteBranchProps,
  BranchDetailProps,
  PrincipalsAndBranchGrade,
  BranchSelectorProps,
} from "@/types/index";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getToken } from "./user.actions";

export async function getBranchList(params: BranchListFilterProps) {
  const { page, searchQuery } = params;
  const token = await getToken();

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
  const token = await getToken();
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
  const token = await getToken();

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
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.API_URL}/branch/principals/branch_grade`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-cache",
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

export async function getBranchSelector(): Promise<BranchSelectorProps[]> {
  const token = await getToken();
  try {
    const response = await fetch(`${process.env.API_URL}/branch/selector`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-cache",
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

export async function createBranch(formData: FormData) {
  const token = await getToken();

  try {
    const formDataObject = Object.fromEntries(formData);
    const {
      address_line_1,
      address_line_2,
      address_line_3,
      city,
      state,
      postcode,
      ...rest
    } = formDataObject;
    // Transform data as needed
    const payload = {
      ...rest,
      // Add any date transformations if needed
      operation_date: rest.operation_date
        ? rest.operation_date
        : new Date().toISOString().split("T")[0],

      // Handle nested address data if present
      address: {
        address_line_1,
        address_line_2,
        address_line_3,
        city,
        state,
        postcode,
      },
    };
    const response = await fetch(`${process.env.API_URL}/branch/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Handle different types of errors
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      } else if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.");
      } else if (response.status === 403) {
        throw new Error("You do not have permission to create a branch.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    revalidatePath("/branch");
  } catch (error) {
    console.error("Error creating branch:", error);
    throw error;
  }
}
export async function updateBranch(formData: FormData, id: number) {
  const token = await getToken();

  try {
    const formDataObject = Object.fromEntries(formData);
    const {
      address_line_1,
      address_line_2,
      address_line_3,
      city,
      state,
      postcode,
      ...rest
    } = formDataObject;
    // Transform data as needed
    const payload = {
      ...rest,
      // Ensure numeric fields are sent as numbers
      principal: rest.principal ? Number(rest.principal) : null,
      branch_grade: rest.branch_grade ? Number(rest.branch_grade) : null,
      // Add any date transformations if needed
      operation_date: rest.operation_date
        ? rest.operation_date
        : new Date().toISOString().split("T")[0],

      // Handle nested address data if present
      address: {
        address_line_1,
        address_line_2,
        address_line_3,
        city,
        state,
        postcode,
      },
    };

    const response = await fetch(`${process.env.API_URL}/branch/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Handle different types of errors
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      } else if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.");
      } else if (response.status === 403) {
        throw new Error("You do not have permission to create a branch.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    revalidatePath("/branch");
  } catch (error) {
    console.error("Error creating branch:", error);
    throw error;
  }
}

export async function setBranchCookie(id: string, path: string) {
  cookies().set("BranchId", id);
  console.log(`here:${cookies().get("BranchId")?.value}`);
  revalidatePath(path);
}
