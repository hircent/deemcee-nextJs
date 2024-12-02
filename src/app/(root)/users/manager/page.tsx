import { PageListTable } from "@/components/PageList";
import { MANAGER } from "@/constants/message";
import { getUserListByType } from "@/lib/actions/user.actions";
import React from "react";
import { ManagerlListColumns } from "@/columns/manager.list.columns";
import { SearchParamProps } from "@/types/index";

const Managers = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getUserListByType({
      type: MANAGER,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
    });
    return (
      <div className="home-content">
        <PageListTable columns={ManagerlListColumns} data={result.data} />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Managers;
