import { PageListTable } from "@/components/PageList";
import Create from "@/components/Create";
import SearchBar from "@/components/SearchBar";
import { PARENT } from "@/constants/message";
import { authUser, getUserListByType } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";
import { ParentListColumns } from "@/columns/parent.list.columns";
import { SearchParamProps } from "@/types/index";
import { IsManagerOrHigher } from "@/constants/index";
import Pagination from "@/components/Pagination";

const Parent = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getUserListByType({
      type: PARENT,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
    });
    return (
      <div className="p-4">
        <PageListTable columns={ParentListColumns} data={result.data} />

        <Pagination
          next={result.next}
          previous={result.previous}
          baseUrl="/deusers/parent"
        />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Parent;
