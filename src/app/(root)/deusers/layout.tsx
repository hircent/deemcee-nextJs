import CreateDeUsers from "@/components/CreateDeUsers";
import SearchBar from "@/components/SearchBar";
import SectionNav from "@/components/SectionNav";
import { DeUsersLinks, IsManagerOrHigher } from "@/constants/index";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  const userRole = getUserRole(user);
  return (
    <section className="home">
      <div className="home-content">
        <div className="flex justify-between">
          <SearchBar />
          {IsManagerOrHigher.includes(userRole[0]) && <CreateDeUsers />}
        </div>
        <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
          <SectionNav links={DeUsersLinks} />
          {children}
        </div>
      </div>
    </section>
  );
};

export default Layout;
