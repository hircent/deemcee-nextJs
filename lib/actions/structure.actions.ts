"use server";

import { getToken } from "./user.actions";
import {
  CategoryData,
  CategoryFormErrors,
  GenerateCalendarThemeLessonError,
  GradeData,
  GradeDataErrors,
  ThemeData,
  ThemeDetails,
  ThemeDetailsError,
  TierListData,
} from "@/types/structure";
import { GetResponseProps, STATE } from "@/types/index";
import {
  CategoryFormSchema,
  GenerateThemeLessonSchema,
  GradeDataSchema,
  ThemeDetailsSchema,
} from "@/constants/form";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { CountryListData } from "@/types/country";

export async function getCategoryList(
  year: string | null = null
): Promise<CategoryData[]> {
  const token = await getToken();

  try {
    const response = await fetch(`${process.env.API_URL}/category/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
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

export async function getCategorySelectionList(): Promise<CategoryData[]> {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.API_URL}/category/selection-list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category data " + response.statusText);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function createCategory(
  _prevState: STATE<CategoryFormErrors>,
  formData: FormData
): Promise<STATE<CategoryFormErrors>> {
  try {
    const token = await getToken();

    const data = Object.fromEntries(formData);
    const validated = CategoryFormSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as CategoryFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(`${process.env.API_URL}/category/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath("/structure/category");
    return { success: true, msg: "Category has been created" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function editCategory(
  prevState: STATE<CategoryFormErrors>,
  formData: FormData
): Promise<STATE<CategoryFormErrors>> {
  try {
    const token = await getToken();
    const obj = Object.fromEntries(formData);
    const data = {
      ...obj,
      id: Number(formData.get("id")), // Convert id to number
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

    const response = await fetch(
      `${process.env.API_URL}/category/update/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      return { ...prevState, error: true, msg: response.statusText };
    }

    revalidatePath("/structure/category");
    return { ...prevState, success: true, msg: "Category is updated" };
  } catch (error) {
    return { ...prevState, error: true, msg: (error as Error).message };
  }
}

export async function getGradeList(tier: string): Promise<GradeData[]> {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.API_URL}/grade/list?tier=${tier}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch grade data " + response.statusText);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function createGrade(
  _prevState: STATE<GradeDataErrors>,
  formData: FormData
): Promise<STATE<GradeDataErrors>> {
  try {
    const token = await getToken();

    const data = Object.fromEntries(formData);
    const validated = GradeDataSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as GradeDataErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(`${process.env.API_URL}/grade/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath("/structure/grade");
    return { success: true, msg: "Grade has been created" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function updateGrade(
  prevState: STATE<GradeDataErrors>,
  formData: FormData
): Promise<STATE<GradeDataErrors>> {
  try {
    const token = await getToken();

    const data = Object.fromEntries(formData);
    const validated = GradeDataSchema.safeParse(data);

    if (!validated.success) {
      return {
        ...prevState,
        error: true,
        zodErr: validated.error.flatten().fieldErrors as GradeDataErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/grade/update/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath("/structure/grade");
    return { success: true, msg: "Grade has been updated" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function deleteGrade(
  prevState: STATE<GradeDataErrors>,
  formData: FormData
): Promise<STATE<GradeDataErrors>> {
  try {
    const token = await getToken();

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

    const response = await fetch(
      `${process.env.API_URL}/grade/delete/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    return { success: true, msg: "Grade has been deleted" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function getThemeList(
  year: string | null = null,
  category: string | null = null
): Promise<ThemeData[]> {
  const token = await getToken();

  let url = `${process.env.API_URL}/theme/list`;

  if (year && category) {
    url = url + `?year=${year}&category=${category}`;
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch theme data " + response.statusText);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function getThemeDetails(id: number): Promise<ThemeDetails> {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.API_URL}/theme/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error("Failed to fetch theme details " + res.msg);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function createTheme(
  _prevState: STATE<ThemeDetailsError>,
  formData: FormData
): Promise<STATE<ThemeDetailsError>> {
  try {
    const token = await getToken();

    const data = Object.fromEntries(formData);
    const validated = ThemeDetailsSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as ThemeDetailsError,
        msg: "Validation Failed",
      };
    }

    const { lesson_1, lesson_2, lesson_3, lesson_4, name, category } = data;

    const payload = {
      name,
      category,
      lessons: {
        title: name,
        lesson_one: lesson_1,
        lesson_two: lesson_2,
        lesson_three: lesson_3,
        lesson_four: lesson_4,
      },
    };

    const response = await fetch(`${process.env.API_URL}/theme/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    revalidatePath("/structure/theme");
    return { success: true, msg: "Theme is created" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function editTheme(
  _prevState: STATE<ThemeDetailsError>,
  formData: FormData
): Promise<STATE<ThemeDetailsError>> {
  try {
    const token = await getToken();

    const data = Object.fromEntries(formData);
    const validated = ThemeDetailsSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten().fieldErrors as ThemeDetailsError,
        msg: "Validation Failed",
      };
    }

    const { lesson_1, lesson_2, lesson_3, lesson_4, name, category } = data;

    const payload = {
      name,
      category,
      lessons: {
        title: name,
        lesson_one: lesson_1,
        lesson_two: lesson_2,
        lesson_three: lesson_3,
        lesson_four: lesson_4,
      },
    };

    const response = await fetch(
      `${process.env.API_URL}/theme/update/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    return { success: true, msg: "Theme is updated" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function deleteTheme(
  prevState: STATE<ThemeDetailsError>,
  formData: FormData
): Promise<STATE<ThemeDetailsError>> {
  try {
    const token = await getToken();

    const obj = Object.fromEntries(formData);

    const data = {
      ...obj,
    };

    if (obj.name !== obj.confirmName) {
      return {
        ...prevState,
        error: true,
        msg: "Name must be excatly the same.",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/theme/delete/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.msg };
    }

    return { success: true, msg: "Theme has been deleted" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function generateCalendarThemeLesson(
  _prevState: STATE<GenerateCalendarThemeLessonError>,
  formData: FormData
): Promise<STATE<GenerateCalendarThemeLessonError>> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;
  const data = Object.fromEntries(formData);
  const validated = GenerateThemeLessonSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: true,
      zodErr: validated.error.flatten()
        .fieldErrors as GenerateCalendarThemeLessonError,
      msg: "Year is required",
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/generate_theme_lesson/${data.year}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      const res = await response.json();
      return { error: true, msg: res.message };
    }

    revalidatePath("/class");
    return { success: true, msg: "Generate Theme Lesson is successful" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}

export async function getTierList(): Promise<TierListData[]> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/tier/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch grade data " + response.statusText);
    }

    const data: GetResponseProps<TierListData> = await response.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function getCountryList(): Promise<CountryListData[]> {
  const token = await getToken();

  try {
    const response = await fetch(`${process.env.API_URL}/country/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch grade data " + response.statusText);
    }

    const data: GetResponseProps<CountryListData> = await response.json();
    return data.data;
  } catch (error) {
    return [];
  }
}
