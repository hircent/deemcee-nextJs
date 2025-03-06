"use server";

import { ListProps } from "@/types/index";
import { PromoCodeData } from "@/types/promocode";
import { cookies } from "next/headers";
import { getToken } from "./user.actions";

export const getPromoCodeList = async (): Promise<ListProps<PromoCodeData>> => {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const response = await fetch(`${process.env.API_URL}/promo-code/list`, {
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
    throw new Error("Failed to fetch promo code data " + error);
  }
};
