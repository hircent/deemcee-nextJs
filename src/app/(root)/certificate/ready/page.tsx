import { CertificateListColumns } from "@/columns/certificate.list.column";
import { PageListTable } from "@/components/PageList";
import Pagination from "@/components/Pagination";
import { getCertificateList } from "@/lib/actions/certificate.action";
import React from "react";

const Ready = async () => {
  const result = await getCertificateList();

  return (
    <div className="p-4">
      <PageListTable columns={CertificateListColumns} data={result.data} />

      <Pagination
        next={result.next}
        previous={result.previous}
        baseUrl="/certificate/ready"
      />
    </div>
  );
};

export default Ready;
