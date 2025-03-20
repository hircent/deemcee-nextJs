"use server";

import { getToken } from "./user.actions";
import { cookies } from "next/headers";
import { PaymentData } from "@/types/payment";

export async function getPaymentDetails(id: number): Promise<PaymentData> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  try {
    const response = await fetch(
      `${process.env.API_URL}/payment/details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch payment data " + response.statusText);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    throw error;
  }
}
