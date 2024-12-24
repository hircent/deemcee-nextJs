import { BranchListColumns } from "@/columns/branch.list.columns";
import { PageListTable } from "@/components/PageList";
import CreateBranch from "@/components/CreateBranch";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { BRANCH } from "@/constants/message";
import { getBranchList } from "@/lib/actions/branch.action";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { BranchProps, ListProps, SearchParamProps } from "@/types/index";
import Link from "next/link";

import React from "react";
import { IsSuperadmin } from "@/constants/index";
import Pagination from "@/components/Pagination";

export default async function Branch({ searchParams }: SearchParamProps) {
  try {
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
        <PageListTable columns={BranchListColumns} data={result.data} />

        <Pagination
          next={result.next}
          previous={result.previous}
          baseUrl="/branch"
        />
      </div>
    );
  } catch (error) {
    return;
  }
}
