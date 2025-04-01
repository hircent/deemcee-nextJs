import { PrincipalListColumns } from "@/columns/principal.list.columns";
import { PageListTable } from "@/components/PageList";
import React from "react";
import { SearchParamProps } from "@/types/index";
import Pagination from "@/components/Pagination";
import { getStudentList } from "@/lib/actions/student.action";
import { StudentListColumns } from "@/columns/student.list.columns";
import { PaginationWrapper } from "@/components/PaginationWrapper";

const Student = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getStudentList({
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q ? searchParams.q.toString() : undefined,
      filter: searchParams.status ? searchParams.status.toString() : undefined,
    });
    return (
      <div className="p-4">
        <PaginationWrapper
          columns={StudentListColumns}
          paginationData={result}
          baseUrl="/deusers/student"
        />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Student;
