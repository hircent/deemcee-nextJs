import React from "react";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import { PageListTable } from "@/components/PageList";
import { PromoCodeListColumns } from "@/columns/promocode.list.column";
import Pagination from "@/components/Pagination";
import { getPromoCodeList } from "@/lib/actions/promocode.action";

const PromoCode = async () => {
  const user = await authUser();
  const userRole = getUserRole(user);
  const result = await getPromoCodeList();
  console.log({ result: result.data });
  return (
    <div className="home-content">
      <div className="flex justify-between">
        <SearchBar />
        add
      </div>
      <PageListTable columns={PromoCodeListColumns} data={result.data} />

      <Pagination
        next={result.next}
        previous={result.previous}
        baseUrl="/promocode"
      />
    </div>
  );
};

export default PromoCode;
