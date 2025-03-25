import CreateCategory from "@/components/CreateCategory";
import SectionNav from "@/components/SectionNav";
import StructureFilterBar from "@/components/StructureFilterBar";
import { IsSuperadmin, StructureLinks } from "@/constants/index";
import { getCountryList, getTierList } from "@/lib/actions/structure.actions";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { UserRole } from "@/types/index";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  const userRole = getUserRole(user) as UserRole;

  const countryList = await getCountryList();
  const tierList = await getTierList();

  return (
    <div className="home-content">
      <div className="flex justify-between">
        {/* <SearchBar /> */}
        <StructureFilterBar countryList={countryList} tierList={tierList} />
        <div></div>
        {IsSuperadmin.includes(userRole[0]) && <CreateCategory />}
      </div>
      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={StructureLinks} userRole={userRole[0]} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
