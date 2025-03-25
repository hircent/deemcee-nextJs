import SectionNav from "@/components/SectionNav";
import { UserManagementLinks } from "@/constants/index";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import UserHeaderComponent from "@/components/UserHeaderComponent";
import { UserRole } from "@/types/index";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  const userRole = getUserRole(user) as UserRole;

  return (
    <div className="home-content">
      <UserHeaderComponent userRole={userRole} />

      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={UserManagementLinks} userRole={userRole[0]} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
