import { PageListTable } from "@/components/PageList";
import { SUPERADMIN } from "@/constants/message";
import { getUserListByType } from "@/lib/actions/user.actions";
import React from "react";
import { SuperadminListColumns } from "@/columns/superadmin.list.columns";
import { SearchParamProps } from "@/types/index";

const Superadmins = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getUserListByType({
      type: SUPERADMIN,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
    });
    return (
      <div className="home-content">
        <PageListTable columns={SuperadminListColumns} data={result.data} />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Superadmins;
