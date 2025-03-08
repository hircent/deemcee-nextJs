"use server";

import { CertificateData } from "@/types/certificate";
import { ListProps } from "@/types/index";
import { cookies } from "next/headers";
import { getToken } from "./user.actions";

export const getCertificateList = async (
  isPrinted: boolean = false
): Promise<ListProps<CertificateData>> => {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;
    let url = `${process.env.API_URL}/certificate/list`;
    if (isPrinted) {
      url = `${process.env.API_URL}/certificate/list?is_printed=1`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch certificate data " + error);
  }
};
