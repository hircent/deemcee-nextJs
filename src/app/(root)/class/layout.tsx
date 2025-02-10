import CreateClasses from "@/components/CreateClasses";
import DateInputFilter from "@/components/DateInputFilter";
import SectionNav from "@/components/SectionNav";
import { ClassLinks, IsSuperadmin } from "@/constants/index";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  const userRole = getUserRole(user);
  return (
    <div className="home-content">
      <div className="flex justify-between">
        <DateInputFilter />
        <div></div>
        {IsSuperadmin.includes(userRole[0]) && <CreateClasses />}
      </div>
      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={ClassLinks} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
