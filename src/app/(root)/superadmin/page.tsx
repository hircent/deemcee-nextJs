import Create from "@/components/Create";
import SearchBar from "@/components/SearchBar";
import { SUPERADMIN } from "@/constants/message";
import { getSuperadminList } from "@/lib/actions/superadmin.action";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";

const Superadmin = async () => {
  try {
    const superadmin = await getSuperadminList();
    const user = await authUser();
    const userRole = getUserRole(user);
    console.log(superadmin);
    return (
      <div className="home-content">
        <div className="flex justify-between">
          <SearchBar />
          {userRole.includes("superadmin") && <Create type={SUPERADMIN} />}
        </div>
      </div>
    );
  } catch (error) {
    return;
  }
};

export default Superadmin;
