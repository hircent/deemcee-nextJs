import Create from "@/components/Create";
import SearchBar from "@/components/SearchBar";
import SectionNav from "@/components/SectionNav";
import { UserManagementLinks, IsSuperadmin } from "@/constants/index";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { MANAGER } from "@/constants/message";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  const userRole = getUserRole(user);

  return (
    <div className="home-content">
      <div className="flex justify-between">
        <SearchBar />
        {IsSuperadmin.includes(userRole[0]) && <Create type={MANAGER} />}
      </div>
      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={UserManagementLinks} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
