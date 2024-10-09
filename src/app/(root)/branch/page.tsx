import { BranchListColumns } from "@/columns/branch.list.columns";
import { BranchListTable } from "@/components/BranchList";
import CreateBranch from "@/components/CreateBranch";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { BRANCH } from "@/constants/message";
import { getAllPrincipalAndBranchGrade, getBranchList } from "@/lib/actions/branch.action";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { BranchListProps, SearchParamProps } from "@/types/index";
import Link from "next/link";

import React from "react";

export default async function Branch({ searchParams }: SearchParamProps) {

  try {
    const user = await authUser();
    const userRole = getUserRole(user);
    let result: BranchListProps;
    result = await getBranchList({
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
    });

    return (
      <div className="home-content">
        <div className="flex justify-between">
          <SearchBar />
          {userRole.includes("superadmin") && (
              <CreateBranch type={BRANCH}/>
          )}
        </div>
        <BranchListTable columns={BranchListColumns} data={result.data} />

        <div className="flex flex-col">
          {result.next ? (
            <Button className="p-4 bg-white w-20">
              <Link href={`/branch?page=2`}>Next</Link>
            </Button>
          ) : (
            <div></div>
          )}

          {result.previous ? (
            <Button className="p-4 bg-white w-20">
              <Link href={`/branch`}>Pre</Link>
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return;
  }
}
