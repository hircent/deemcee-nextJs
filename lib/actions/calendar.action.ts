"use server";
import { CalendarData, GetCalendarProp } from "@/types/calendar";
import { getToken } from "./user.actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCalendarData(
  year: string | null = null
): Promise<CalendarData[]> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  try {
    if (!year) {
      year = new Date().getFullYear().toString();
    }
    const response = await fetch(`${process.env.API_URL}/calendars/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch calendar data " + response.statusText);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return [];
  }
}
