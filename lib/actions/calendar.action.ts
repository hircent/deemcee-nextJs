"use server";
import {
  CalendarData,
  CalendarThemeLesson,
  GroupedLesson,
  HolidayEventError,
} from "@/types/calendar";
import { getToken } from "./user.actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { HolidayEventSchema, DeleteHolidayEventSchema } from "@/constants/form";
import { STATE } from "@/types/index";
import { processLessonData } from "../utils";

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

export async function getCalendarThemeLessonData(
  year: string,
  month: string | null,
  day: string | null
): Promise<GroupedLesson[]> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/calendars/theme-lesson/list?year=${year}`;

  if (month !== null) {
    url = url + `&month=${month}`;
  }
  if (day !== null) {
    url = url + `&day=${day}`;
  }

  try {
    const response = await fetch(url, {
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

    const convertData = processLessonData(data.data);
    return convertData;
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

export async function deleteCalendar(
  prevState: STATE<HolidayEventError>,
  formData: FormData
): Promise<STATE<HolidayEventError>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const obj = Object.fromEntries(formData);
    const data = {
      ...obj,
      id: Number(formData.get("id")), // Convert id to number
    };

    if (obj.name !== obj.confirmName) {
      return {
        ...prevState,
        error: true,
        msg: "Name must be excatly the same.",
      };
    }

    const validated = DeleteHolidayEventSchema.safeParse(data);
    if (!validated.success) {
      return {
        ...prevState,
        error: true,
        zodErr: validated.error.flatten().fieldErrors as HolidayEventError,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/calendars/delete/${data.id}`,
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

    revalidatePath("/calendar");
    return { success: true, msg: `Calendar ${obj.name} is deleted` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function getCalendarDetails(id: number): Promise<CalendarData> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  try {
    const response = await fetch(
      `${process.env.API_URL}/calendars/details/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch calendar data " + response.statusText);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function editCalendar(
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

    const response = await fetch(
      `${process.env.API_URL}/calendars/update/${data.id}`,
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
      return { ...prevState, error: true, msg: res.msg };
    }

    revalidatePath("/calendar");
    return { ...prevState, success: true, msg: `Calendar is updated` };
  } catch (error) {
    return { ...prevState, error: true, msg: (error as Error).message };
  }
}
