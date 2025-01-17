"use server";

import {
  VideoAssignmentDetails,
  VideoAssignmentFormErrors,
} from "@/types/student";
import { GetResponseProps, ListProps, STATE } from "@/types/index";
import { getToken } from "./user.actions";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { VideoAssignmentFormSchema } from "@/constants/form";

export async function getVideoAssignmentDetails({
  videoId,
}: {
  videoId: number;
}): Promise<VideoAssignmentDetails> {
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;
  try {
    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/video/details/${+videoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${id?.toString()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function editVideoAssignment(
  _prevState: STATE<VideoAssignmentFormErrors>,
  formData: FormData
): Promise<STATE<VideoAssignmentFormErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);
    const validated = VideoAssignmentFormSchema.safeParse(data);

    if (!validated.success) {
      return {
        error: true,
        zodErr: validated.error.flatten()
          .fieldErrors as VideoAssignmentFormErrors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/student/enrolment/video/update/${data.id}`,
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
      return { error: true, msg: res.msg };
    }

    revalidatePath(`student/${data.student_id}`);
    return { success: true, msg: `Video Assignment has been updated` };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}
