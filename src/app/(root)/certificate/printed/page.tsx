import { CertificateListColumns } from "@/columns/certificate.list.column";
import { PageListTable } from "@/components/PageList";
import Pagination from "@/components/Pagination";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { getCertificateList } from "@/lib/actions/certificate.action";
import { SearchParamProps } from "@/types/index";
import React from "react";

const Printed = async ({ searchParams }: SearchParamProps) => {
  const result = await getCertificateList({
    isPrinted: true,
    page: searchParams.page ? +searchParams.page : 1,
    q: searchParams.q ? searchParams.q.toString() : undefined,
  });
  return (
    <div className="p-4">
      <PaginationWrapper
        columns={CertificateListColumns}
        paginationData={result}
        baseUrl="/certificate/printed"
      />
    </div>
  );
};

export default Printed;
