import React from "react";
import { PromoCodeListColumns } from "@/columns/promocode.list.column";
import { getPromoCodeList } from "@/lib/actions/promocode.action";
import { PaginationWrapper } from "@/components/PaginationWrapper";

export const dynamic = "force-dynamic";

const Inactive = async () => {
  const result = await getPromoCodeList("false");

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
