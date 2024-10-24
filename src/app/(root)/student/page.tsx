import { PrincipalListColumns } from "@/columns/principal.list.columns";
import { PageListTable } from "@/components/PageList";
import Create from "@/components/Create";
import SearchBar from "@/components/SearchBar";
import { PRINCIPAL, SUPERADMIN } from "@/constants/message";
import { authUser, getUserListByType } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";
import { SearchParamProps } from "@/types/index";
import { IsPrincipalOrHigher } from "@/constants/index";

const Student = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getUserListByType({
      type: PRINCIPAL,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
    });
    const user = await authUser();
    const userRole = getUserRole(user);
    return (
      <div className="home-content">
        <div className="flex justify-between">
          <SearchBar />
          {IsPrincipalOrHigher.includes(userRole[0]) && <Create type={PRINCIPAL} />}
        </div>
        <PageListTable columns={PrincipalListColumns} data={result.data} />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Student;
