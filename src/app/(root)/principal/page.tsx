import { PrincipalListColumns } from "@/columns/principal.list.columns";
import { PageListTable } from "@/components/PageList";
import Create from "@/components/Create";
import SearchBar from "@/components/SearchBar";
import { PRINCIPAL } from "@/constants/message";
import { getUserListByType } from "@/lib/actions/superadmin.action";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";

const Principal = async () => {
  try {
    const result = await getUserListByType(PRINCIPAL);
    const user = await authUser();
    const userRole = getUserRole(user);
    console.log(result.data);
    return (
      <div className="home-content">
        <div className="flex justify-between">
          <SearchBar />
          {userRole.includes("superadmin") && <Create type={PRINCIPAL} />}
        </div>
        <PageListTable columns={PrincipalListColumns} data={result.data} />
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Principal;
