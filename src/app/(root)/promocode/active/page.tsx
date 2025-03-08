import React from "react";
import { PageListTable } from "@/components/PageList";
import { PromoCodeListColumns } from "@/columns/promocode.list.column";
import Pagination from "@/components/Pagination";
import { getPromoCodeList } from "@/lib/actions/promocode.action";

const Active = async () => {
  const result = await getPromoCodeList();

  return (
    <div className="p-4">
      <PageListTable columns={PromoCodeListColumns} data={result.data} />

      <Pagination
        next={result.next}
        previous={result.previous}
        baseUrl="/promocode"
      />
    </div>
  );
};

export default Active;
