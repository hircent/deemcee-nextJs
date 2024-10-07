import { BranchListColumns } from "@/columns/branch.list.columns";
import { BranchListTable } from "@/components/BranchList";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { getBranchList } from "@/lib/actions/branch.action";
import { BranchListProps, SearchParamProps } from "@/types/index";

import React from "react";

export default async function Branch({ searchParams }: SearchParamProps) {
  let result: BranchListProps;

  result = await getBranchList({
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="home-content">
      <div className="flex justify-between">
        <SearchBar />
        <Button className="rounded-md px-4 py-2 bg-yellow-2">Create</Button>
      </div>
      <BranchListTable columns={BranchListColumns} data={result.data} />
    </div>
  );
}
