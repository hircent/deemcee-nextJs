import { PrincipalListColumns } from "@/columns/principal.list.columns";
import { PageListTable } from "@/components/PageList";
import { PRINCIPAL } from "@/constants/message";
import { getUserListByType } from "@/lib/actions/user.actions";
import React from "react";
import { SearchParamProps } from "@/types/index";

const Principals = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getUserListByType({
      type: PRINCIPAL,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
    });
    return (
      <div className="home-content">
        <PageListTable columns={PrincipalListColumns} data={result.data} />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Principals;
