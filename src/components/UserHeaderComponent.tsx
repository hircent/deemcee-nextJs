"use client";

import Create from "@/components/Create";
import SearchBar from "@/components/SearchBar";
import { getUserRoleAndUserType } from "@/lib/utils";
import { usePathname } from "next/navigation";

const UserHeaderComponent = ({ userRole }: { userRole: string[] }) => {
  const pathname = usePathname();

  const { role, type } = getUserRoleAndUserType(pathname!);

  if (role && type) {
    return (
      <div className="flex justify-between">
        <SearchBar />
        {role.includes(userRole[0]) && <Create type={type} />}
      </div>
    );
  } else {
    return <div className="flex justify-between"></div>;
  }
};

export default UserHeaderComponent;
