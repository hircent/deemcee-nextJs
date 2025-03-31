import { BranchListColumns } from "@/columns/branch.list.columns";
import { PageListTable } from "@/components/PageList";
import CreateBranch from "@/components/CreateBranch";
import SearchBar from "@/components/SearchBar";
import { BRANCH } from "@/constants/message";
import { getBranchList } from "@/lib/actions/branch.action";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { BranchProps, ListProps, SearchParamProps } from "@/types/index";

import React from "react";
import { IsSuperadmin } from "@/constants/index";
import { PaginationWrapper } from "@/components/PaginationWrapper";

export default async function Branch({ searchParams }: SearchParamProps) {
  const user = await authUser();
  const userRole = getUserRole(user);
  let result: ListProps<BranchProps>;
  result = await getBranchList({
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
  });

  return (
    <div className="home-content">
      <div className="flex justify-between">
        <SearchBar />
        {IsSuperadmin.includes(userRole[0]) && <CreateBranch type={BRANCH} />}
      </div>

      <PaginationWrapper
        columns={BranchListColumns}
        paginationData={result}
        baseUrl="/branch"
      />
    </div>
  );
}
