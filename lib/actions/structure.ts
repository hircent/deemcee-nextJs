"use server";

import { cookies } from "next/headers";
import { getToken } from "./user.actions";
import { CategoryData, CategoryFormErrors } from "@/types/structure";
import { STATE } from "@/types/index";
import { CategoryFormSchema } from "@/constants/form";
import { revalidatePath } from "next/cache";



export async function getCategoryData(
    year: string | null = null
  ): Promise<CategoryData[]> {
    const token = await getToken();
  
    try {
      const response = await fetch(`${process.env.API_URL}/category/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch category data " + response.statusText);
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      return [];
    }
  }


export async function editCategory(
  prevState:STATE<CategoryFormErrors>,
  formData: FormData,
):Promise<STATE<CategoryFormErrors>> {
  try {
    const token = await getToken();
    const obj = Object.fromEntries(formData)
      const data = {
        ...obj,
        id: Number(formData.get('id'))  // Convert id to number
      };
  
    const validated = CategoryFormSchema.safeParse(data);
      
    if (!validated.success) {
      return {
        ...prevState,
        error: true,
        zodErr: validated.error.flatten().fieldErrors as CategoryFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(`${process.env.API_URL}/category/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body:JSON.stringify(data)
    });

    if (!response.ok) {
      return { ...prevState,error: true, msg: response.statusText };
    }
  
    revalidatePath("/structure/category");
    return {...prevState,success:true,msg:"Category is updated"}
    
  } catch (error) {
    return { ...prevState,error: true, msg: (error as Error).message };
  }
}