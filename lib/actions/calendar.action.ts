"use server";
import {
  CalendarData,
  GetCalendarProp,
  HolidayEventError,
} from "@/types/calendar";
import { getToken } from "./user.actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { HolidayEventSchema } from "@/constants/form";
import { STATE } from "@/types/index";

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
    return [];
  }
}

export async function createHoliday(
  prevState: STATE<HolidayEventError>,
  formData: FormData
): Promise<STATE<HolidayEventError>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);

    if (data.end_datetime) {
      const dateOnly = (data.end_datetime as string).split("T")[0];
      data.end_datetime = `${dateOnly}T23:59:59`;
    }

    const validated = HolidayEventSchema.safeParse(data);

    if (!validated.success) {
      return {
        ...prevState,
        error: true,
        zodErr: validated.error.flatten().fieldErrors as HolidayEventError,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(`${process.env.API_URL}/calendars/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { success: false, msg: response.statusText };
    }
    revalidatePath("/calendar");
    return { success: true, msg: "Holiday event created successfully" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}
