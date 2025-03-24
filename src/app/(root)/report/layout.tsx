import ReportFilters from "@/components/ReportFilters";
import SectionNav from "@/components/SectionNav";
import { ReportLinks } from "@/constants/index";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { cookies } from "next/headers";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  const userRole = getUserRole(user);
  const branchId = cookies().get("BranchId")?.value;

  return (
    <div className="home-content">
      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={ReportLinks} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
