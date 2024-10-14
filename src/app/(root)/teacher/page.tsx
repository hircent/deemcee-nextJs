import { PageListTable } from "@/components/PageList";
import Create from "@/components/Create";
import SearchBar from "@/components/SearchBar";
import { TEACHER } from "@/constants/message";
import { getUserListByType } from "@/lib/actions/superadmin.action";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";
import { TeacherListColumns } from "@/columns/teacher.list.columns";
import { SearchParamProps } from "@/types/index";

const Teacher = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getUserListByType({
      type:TEACHER,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined
    });
    const user = await authUser();
    const userRole = getUserRole(user);
    return (
      <div className="home-content">
        <div className="flex justify-between">
          <SearchBar />
          {userRole.includes("superadmin") && <Create type={TEACHER} />}
        </div>
        <PageListTable columns={TeacherListColumns} data={result.data} />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Teacher;
