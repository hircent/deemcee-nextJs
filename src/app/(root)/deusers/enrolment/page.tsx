import { PageListTable } from "@/components/PageList";
import { PARENT } from "@/constants/message";
import React from "react";
import { SearchParamProps } from "@/types/index";
import Pagination from "@/components/Pagination";
import { EnrolmentListColumns } from "@/columns/enrolment.list.columns";
import { getEnrolmentList } from "@/lib/actions/student.action";

const Enrolment = async ({ searchParams }: SearchParamProps) => {
  try {
    const result = await getEnrolmentList({
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
        <PageListTable columns={EnrolmentListColumns} data={result.data} />

        <Pagination
          next={result.next}
          previous={result.previous}
          baseUrl="/deusers/enrolment"
        />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Enrolment;
