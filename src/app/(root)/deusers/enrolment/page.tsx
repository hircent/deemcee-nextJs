import React from "react";
import { SearchParamProps } from "@/types/index";
import { EnrolmentListColumns } from "@/columns/enrolment.list.columns";
import { getEnrolmentList } from "@/lib/actions/student.action";
import { PaginationWrapper } from "@/components/PaginationWrapper";

const Enrolment = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getEnrolmentList({
      page: searchParams.page ? +searchParams.page : 1,
      name: searchParams.q ? searchParams.q.toString() : undefined,
      is_active: searchParams.is_active
        ? searchParams.is_active === "true"
          ? true
          : false
        : true,
      status: searchParams.status ? searchParams.status.toString() : "KIDS",
    });

    return (
      <div className="p-4">
        <PaginationWrapper
          columns={EnrolmentListColumns}
          paginationData={result}
          baseUrl="/deusers/enrolment"
        />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Enrolment;
