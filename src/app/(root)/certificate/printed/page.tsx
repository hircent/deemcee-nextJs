import { CertificateListColumns } from "@/columns/certificate.list.column";
import { PageListTable } from "@/components/PageList";
import Pagination from "@/components/Pagination";
import { getCertificateList } from "@/lib/actions/certificate.action";
import React from "react";

const Printed = async () => {
  const result = await getCertificateList(true);
  return (
    <div className="p-4">
      <PageListTable columns={CertificateListColumns} data={result.data} />

      <Pagination
        next={result.next}
        previous={result.previous}
        baseUrl="/certificate/printed"
      />
    </div>
  );
};

export default Printed;
