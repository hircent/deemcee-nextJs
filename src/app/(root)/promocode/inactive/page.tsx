import React from "react";
import { PageListTable } from "@/components/PageList";
import { PromoCodeListColumns } from "@/columns/promocode.list.column";
import Pagination from "@/components/Pagination";
import { getPromoCodeList } from "@/lib/actions/promocode.action";
import { PaginationWrapper } from "@/components/PaginationWrapper";

const Inactive = async () => {
  const result = await getPromoCodeList();

  return (
    <div className="p-4">
      <PaginationWrapper
        columns={PromoCodeListColumns}
        paginationData={result}
        baseUrl="/promocode"
      />
    </div>
  );
};

export default Inactive;
