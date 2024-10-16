import { PageListTable } from "@/components/PageList";
import Create from "@/components/Create";
import SearchBar from "@/components/SearchBar";
import { SUPERADMIN } from "@/constants/message";
import { authUser, getUserListByType } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";
import { SuperadminListColumns } from "@/columns/superadmin.list.columns";
import { SearchParamProps } from "@/types/index";

const Superadmin = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getUserListByType({
      type: SUPERADMIN,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
    });
    const user = await authUser();
    const userRole = getUserRole(user);
    return (
      <div className="home-content">
        <div className="flex justify-between">
          <SearchBar />
          {userRole.includes("superadmin") && <Create type={SUPERADMIN} />}
        </div>
        <PageListTable columns={SuperadminListColumns} data={result.data} />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Superadmin;
