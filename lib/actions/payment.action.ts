"use server";

import { getToken } from "./user.actions";
import { cookies } from "next/headers";
import {
  MakePaymentFormErrors,
  PaymentData,
  PaymentReportData,
  PaymentReportParams,
} from "@/types/payment";
import { STATE } from "@/types/index";
import { MakePaymentSchema } from "@/constants/form";

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

export async function getPaymentReportList(
  param: PaymentReportParams
): Promise<PaymentReportData> {
  const { month, year } = param;

  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;
    const response = await fetch(
      `${process.env.API_URL}/payment-report/list?month=${month}&year=${year}`,
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

export async function makePayment(
  _prevState: STATE<MakePaymentFormErrors>,
  formData: FormData
): Promise<STATE<MakePaymentFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = MakePaymentSchema.safeParse(data);
    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as MakePaymentFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/payment/make-payment/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { success: false, msg: response.statusText };
    }

    return { success: true, msg: "Payment is made successfully" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}
