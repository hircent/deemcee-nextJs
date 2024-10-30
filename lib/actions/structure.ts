"use server";

import { cookies } from "next/headers";
import { getToken } from "./user.actions";
import { CategoryData } from "@/types/structure";



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