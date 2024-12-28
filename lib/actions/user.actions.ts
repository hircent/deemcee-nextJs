"use server";

import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESSFUL,
  SERVER_ERROR,
} from "@/constants/message";
import {
  DeleteUserProps,
  GetUserDetailProps,
  signInProps,
  signInResponse,
  TypeUserDetailsProps,
  User,
  UpdateUserDetailProps,
  UserFullDetailsData,
  STATE,
  ChangePasswordErrors,
  ParentFullDetailsData,
} from "@/types/index";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { ListProps, TypeUserProps, UserListFilterProps } from "@/types/index";
import { revalidatePath } from "next/cache";
import { ChangePasswordSchema } from "@/constants/form";

// import { revalidatePath } from "next/cache";

export const signIn = async ({
  email,
  password,
}: signInProps): Promise<signInResponse> => {
  try {
    const response = fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if ((await response).status === 401) {
      return parseStringify({
        success: false,
        msg: LOGIN_FAILED,
      });
    }

    if (!(await response).ok) {
      return parseStringify({ success: false, msg: SERVER_ERROR });
    }

    const data = await (await response).json();

    cookies().set("deemceeAuth", data.access, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 5,
      secure: process.env.ENVIRONMENT !== "development",
    });

    const userData = jwtDecode<User>(data.access);
    await setCookieDefaultBranch(userData);
    return parseStringify({
      success: true,
      msg: LOGIN_SUCCESSFUL,
      data: userData,
    });
  } catch (error: any) {
    return parseStringify({
      success: false,
      msg: SERVER_ERROR,
      data: undefined,
    });
  }
};

export const signOut = async () => {
  const cookieStore = cookies();

  cookieStore.delete("deemceeAuth");
};

export const authUser = async (): Promise<User | undefined> => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("deemceeAuth");

  if (cookie && cookie.value) {
    try {
      const user = jwtDecode<User>(cookie.value);
      return user;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return undefined;
    }
  }
  return undefined;
};

export const setCookieDefaultBranch = async (userData: User) => {
  cookies().set("BranchId", userData.branch_role[0].branch_id.toString());
};

export async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("deemceeAuth");

  if (!token) {
    redirect("/sign-in");
  }

  return token;
}

export async function getUserListByType(
  params: UserListFilterProps
): Promise<ListProps<TypeUserProps>> {
  const { type, page, searchQuery } = params;
  const token = await getToken();
  const id = cookies().get("BranchId")?.value;

  let url = `${process.env.API_URL}/users/${type}/list`;

  if (searchQuery) {
    url = `${url}?q=${searchQuery}`;
  }

  if (page && page > 1) {
    url = `${url}?page=${page}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${id?.toString()}`,
      },
      // next:{
      //     revalidate:3300
      // },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser({
  type,
  name,
  confirmName,
  id,
}: DeleteUserProps) {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;
  if (name !== confirmName) {
    throw new Error(
      "Names do not match! Please enter the exact name to confirm deletion."
    );
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/users/delete/${type}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
      }
    );

    if (response.status == 404) {
      throw new Error(`User ${response.statusText}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    revalidatePath(`/${type}`);
  } catch (error) {
    throw error;
  }
}

export async function createUser(formData: FormData, type: string) {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;
  try {
    const formDataObject = Object.fromEntries(formData);

    const {
      address_line_1,
      address_line_2,
      address_line_3,
      city,
      state,
      postcode,
      username,
      email,
      confirm_password,
      password,
    } = formDataObject;

    if (password !== confirm_password) {
      throw new Error("Password doesnt match");
    }
    const payload = {
      username,
      email,
      password,
      address: {
        address_line_1,
        address_line_2,
        address_line_3,
        city,
        state,
        postcode,
      },
    };

    const response = await fetch(
      `${process.env.API_URL}/users/create/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    revalidatePath(`/${type}`);
  } catch (error) {
    throw error;
  }
}

export async function getUserDetails({
  id,
}: GetUserDetailProps): Promise<TypeUserDetailsProps> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;
  try {
    const response = await fetch(`${process.env.API_URL}/users/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserFullDetails({
  id,
}: GetUserDetailProps): Promise<UserFullDetailsData> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;
  try {
    const response = await fetch(`${process.env.API_URL}/users/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getParentFullDetails({
  id,
}: GetUserDetailProps): Promise<ParentFullDetailsData> {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;
  try {
    const response = await fetch(
      `${process.env.API_URL}/parent/details/${id}`,
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
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser({
  id,
  type,
  formData,
}: UpdateUserDetailProps) {
  const token = await getToken();
  const branchId = cookies().get("BranchId")?.value;

  try {
    const {
      address_line_1,
      address_line_2,
      address_line_3,
      city,
      state,
      postcode,
      ...rest
    } = formData;

    const payload = {
      ...rest,
      address: {
        address_line_1,
        address_line_2,
        address_line_3,
        city,
        state,
        postcode,
      },
    };

    const response = await fetch(
      `${process.env.API_URL}/users/update/${type}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
          BranchId: `${branchId?.toString()}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    revalidatePath(`/${type}`);
  } catch (error) {
    throw error;
  }
}

export async function changePw(
  _prevState: STATE<ChangePasswordErrors>,
  formData: FormData
): Promise<STATE<ChangePasswordErrors>> {
  try {
    const token = await getToken();
    const branchId = cookies().get("BranchId")?.value;

    const data = Object.fromEntries(formData);

    const validated = ChangePasswordSchema.safeParse(data);

    if (!validated.success) {
      // Get all field errors
      const fieldErrors = validated.error.flatten().fieldErrors;

      // Format errors into our desired structure
      const errors: ChangePasswordErrors = {
        old_password: fieldErrors.old_password || undefined,
        new_password: fieldErrors.new_password || undefined,
        confirm_password: fieldErrors.confirm_password || undefined,
      };

      // Clean up undefined fields
      Object.keys(errors).forEach((key) => {
        if (errors[key as keyof ChangePasswordErrors] === undefined) {
          delete errors[key as keyof ChangePasswordErrors];
        }
      });

      return {
        error: true,
        zodErr: errors,
        msg: "Validation Failed",
      };
    }

    const response = await fetch(`${process.env.API_URL}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        BranchId: `${branchId?.toString()}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status == 400) {
      const res = await response.json();
      throw new Error(`${JSON.stringify(res.msg)}`);
    }
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.statusText}`);
    }

    return { success: true, msg: "Password changed successfully" };
  } catch (error) {
    return { error: true, msg: (error as Error).message };
  }
}
