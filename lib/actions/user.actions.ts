"use server";

import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESSFUL,
  SERVER_ERROR,
} from "@/constants/message";
import { signInProps, signInResponse, User } from "@/types/index";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { ListProps, TypeUserProps, UserListFilterProps } from "@/types/index";

// import { revalidatePath } from "next/cache";

export const signIn = async ({
  email,
  password,
}: signInProps): Promise<signInResponse> => {
  try {
    const response = fetch("http://localhost:8000/api/login", {
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

export async function getUserListByType(params:UserListFilterProps): Promise<ListProps<TypeUserProps>> {
  const { type ,page, searchQuery } = params;
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
    const response = await fetch(
      url,
      {
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
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// export const getUserInfo = async ({ userId }: getUserInfoProps) => {
//   try {
//     const { database } = await createAdminClient();

//     const user = await database.listDocuments(
//       DATABASE_ID!,
//       USER_COLLECTION_ID!,
//       [Query.equal('userId', [userId])]
//     )

//     return parseStringify(user.documents[0]);
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const signUp = async ({ password, ...userData }: SignUpParams) => {
//   const { email, firstName, lastName } = userData;

//   let newUserAccount;

//   try {
//     const { account, database } = await createAdminClient();

//     newUserAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       `${firstName} ${lastName}`
//     );

//     if(!newUserAccount) throw new Error('Error creating user')

//     const dwollaCustomerUrl = await createDwollaCustomer({
//       ...userData,
//       type: 'personal'
//     })

//     if(!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer')

//     const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

//     const newUser = await database.createDocument(
//       DATABASE_ID!,
//       USER_COLLECTION_ID!,
//       ID.unique(),
//       {
//         ...userData,
//         userId: newUserAccount.$id,
//         dwollaCustomerId,
//         dwollaCustomerUrl
//       }
//     )

//     const session = await account.createEmailPasswordSession(email, password);

//     cookies().set("appwrite-session", session.secret, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//     });

//     return parseStringify(newUser);
//   } catch (error) {
//     console.error('Error', error);
//   }
// }

// export async function getLoggedInUser() {
//   try {
//     const { account } = await createSessionClient();
//     const result = await account.get();

//     const user = await getUserInfo({ userId: result.$id})

//     return parseStringify(user);
//   } catch (error) {
//     console.log(error)
//     return null;
//   }
// }

// export const logoutAccount = async () => {
//   try {
//     const { account } = await createSessionClient();

//     cookies().delete('appwrite-session');

//     await account.deleteSession('current');
//   } catch (error) {
//     return null;
//   }
// }

// export const createLinkToken = async (user: User) => {
//   try {
//     const tokenParams = {
//       user: {
//         client_user_id: user.$id
//       },
//       client_name: `${user.firstName} ${user.lastName}`,
//       products: ['auth'] as Products[],
//       language: 'en',
//       country_codes: ['US'] as CountryCode[],
//     }

//     const response = await plaidClient.linkTokenCreate(tokenParams);

//     return parseStringify({ linkToken: response.data.link_token })
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const createBankAccount = async ({
//   userId,
//   bankId,
//   accountId,
//   accessToken,
//   fundingSourceUrl,
//   shareableId,
// }: createBankAccountProps) => {
//   try {
//     const { database } = await createAdminClient();

//     const bankAccount = await database.createDocument(
//       DATABASE_ID!,
//       BANK_COLLECTION_ID!,
//       ID.unique(),
//       {
//         userId,
//         bankId,
//         accountId,
//         accessToken,
//         fundingSourceUrl,
//         shareableId,
//       }
//     )

//     return parseStringify(bankAccount);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const exchangePublicToken = async ({
//   publicToken,
//   user,
// }: exchangePublicTokenProps) => {
//   try {
//     // Exchange public token for access token and item ID
//     const response = await plaidClient.itemPublicTokenExchange({
//       public_token: publicToken,
//     });

//     const accessToken = response.data.access_token;
//     const itemId = response.data.item_id;

//     // Get account information from Plaid using the access token
//     const accountsResponse = await plaidClient.accountsGet({
//       access_token: accessToken,
//     });

//     const accountData = accountsResponse.data.accounts[0];

//     // Create a processor token for Dwolla using the access token and account ID
//     const request: ProcessorTokenCreateRequest = {
//       access_token: accessToken,
//       account_id: accountData.account_id,
//       processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
//     };

//     const processorTokenResponse = await plaidClient.processorTokenCreate(request);
//     const processorToken = processorTokenResponse.data.processor_token;

//      // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
//      const fundingSourceUrl = await addFundingSource({
//       dwollaCustomerId: user.dwollaCustomerId,
//       processorToken,
//       bankName: accountData.name,
//     });

//     // If the funding source URL is not created, throw an error
//     if (!fundingSourceUrl) throw Error;

//     // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
//     await createBankAccount({
//       userId: user.$id,
//       bankId: itemId,
//       accountId: accountData.account_id,
//       accessToken,
//       fundingSourceUrl,
//       shareableId: encryptId(accountData.account_id),
//     });

//     // Revalidate the path to reflect the changes
//     revalidatePath("/");

//     // Return a success message
//     return parseStringify({
//       publicTokenExchange: "complete",
//     });
//   } catch (error) {
//     console.error("An error occurred while creating exchanging token:", error);
//   }
// }

// export const getBanks = async ({ userId }: getBanksProps) => {
//   try {
//     const { database } = await createAdminClient();

//     const banks = await database.listDocuments(
//       DATABASE_ID!,
//       BANK_COLLECTION_ID!,
//       [Query.equal('userId', [userId])]
//     )

//     return parseStringify(banks.documents);
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getBank = async ({ documentId }: getBankProps) => {
//   try {
//     const { database } = await createAdminClient();

//     const bank = await database.listDocuments(
//       DATABASE_ID!,
//       BANK_COLLECTION_ID!,
//       [Query.equal('$id', [documentId])]
//     )

//     return parseStringify(bank.documents[0]);
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
//   try {
//     const { database } = await createAdminClient();

//     const bank = await database.listDocuments(
//       DATABASE_ID!,
//       BANK_COLLECTION_ID!,
//       [Query.equal('accountId', [accountId])]
//     )

//     if(bank.total !== 1) return null;

//     return parseStringify(bank.documents[0]);
//   } catch (error) {
//     console.log(error)
//   }
// }
