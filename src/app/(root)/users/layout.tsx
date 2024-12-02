import SectionNav from "@/components/SectionNav";
import { UserManagementLinks } from "@/constants/index";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import UserHeaderComponent from "@/components/UserHeaderComponent";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  const userRole = getUserRole(user);

  return (
    <div className="home-content">
      <UserHeaderComponent userRole={userRole} />

      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={UserManagementLinks} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
