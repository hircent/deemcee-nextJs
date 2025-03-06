"use server";

import { ListProps, STATE } from "@/types/index";
import { PromoCodeData, PromoCodeFormErrors } from "@/types/promocode";
import { cookies } from "next/headers";
import { getToken } from "./user.actions";
import { DeleteSchema } from "@/constants/form";
import { revalidatePath } from "next/cache";

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

export const deletePromoCode = async (
  _prevState: STATE<PromoCodeFormErrors>,
  formData: FormData
): Promise<STATE<PromoCodeFormErrors>> => {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = DeleteSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as PromoCodeFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/promo-code/delete/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, msg: response.statusText };
    }

    return { success: true, msg: `Promo Code ${data.name} is deleted` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
};
