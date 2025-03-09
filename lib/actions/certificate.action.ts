"use server";

import { CertificateData, CertificateParams } from "@/types/certificate";
import { ListProps } from "@/types/index";
import { cookies } from "next/headers";
import { getToken } from "./user.actions";

export const getCertificateList = async (
  params: CertificateParams
): Promise<ListProps<CertificateData>> => {
  const { isPrinted, page, q } = params;
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;
    const url = new URL(`${process.env.API_URL}/certificate/list`);
    const searchParams = new URLSearchParams();

    searchParams.set("is_printed", isPrinted ? "1" : "2");

    if (page && page > 1) {
      searchParams.set("page", page.toString());
    }

    if (q) {
      searchParams.set("q", q);
    }

    url.search = searchParams.toString();

    const response = await fetch(url.toString(), {
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
