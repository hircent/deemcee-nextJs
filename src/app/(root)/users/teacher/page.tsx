import { PageListTable } from "@/components/PageList";
import { TEACHER } from "@/constants/message";
import { getUserListByType } from "@/lib/actions/user.actions";
import React from "react";
import { TeacherListColumns } from "@/columns/teacher.list.columns";
import { SearchParamProps } from "@/types/index";

const Teacher = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getUserListByType({
      type: TEACHER,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
    });
    return (
      <div className="home-content">
        <PageListTable columns={TeacherListColumns} data={result.data} />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Teacher;
