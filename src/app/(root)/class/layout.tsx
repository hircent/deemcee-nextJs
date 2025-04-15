import CreateClasses from "@/components/CreateClasses";
import DateInputFilter from "@/components/DateInputFilter";
import SectionNav from "@/components/SectionNav";
import { ClassLinks, IsPrincipalOrHigher } from "@/constants/index";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { UserRole } from "@/types/index";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  const userRole = getUserRole(user) as UserRole;
  return (
    <div className="home-content">
      <div className="flex justify-between">
        <DateInputFilter />
        <div></div>
        {IsPrincipalOrHigher.includes(userRole[0]) && <CreateClasses />}
      </div>
      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={ClassLinks} userRole={userRole[0]} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
