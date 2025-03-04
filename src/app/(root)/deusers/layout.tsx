import CreateDeUsers from "@/components/CreateDeUsers";
import { ExportStudents } from "@/components/ExportStudentCSV";
import SearchBar from "@/components/SearchBar";
import SectionNav from "@/components/SectionNav";
import StudentFilter from "@/components/StudentFilter";
import { DeUsersLinks, IsManagerOrHigher } from "@/constants/index";
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
      <div className="flex flex-wrap justify-between gap-2">
        <SearchBar />
        <StudentFilter />
        <ExportStudents id={branchId!.toString()} />
        {IsManagerOrHigher.includes(userRole[0]) && <CreateDeUsers />}
      </div>
      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={DeUsersLinks} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
