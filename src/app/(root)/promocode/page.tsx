import React from "react";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import { PageListTable } from "@/components/PageList";
import { PromoCodeListColumns } from "@/columns/promocode.list.column";
import Pagination from "@/components/Pagination";
import { getPromoCodeList } from "@/lib/actions/promocode.action";
import CreatePromoCode from "@/components/CreatePromoCode";
import { PaginationWrapper } from "@/components/PaginationWrapper";

const PromoCode = async () => {
  const user = await authUser();
  const userRole = getUserRole(user);
  const result = await getPromoCodeList();

  return (
    <div className="home-content">
      <div className="flex justify-between">
        <SearchBar />
        <CreatePromoCode />
      </div>
      <PaginationWrapper
        columns={PromoCodeListColumns}
        paginationData={result}
        baseUrl="/promocode"
      />
    </div>
  );
};

export default PromoCode;
