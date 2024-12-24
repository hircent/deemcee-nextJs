import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import React from "react";
import ManageClassSection from "@/components/ManageClassSection";
import { getClassList } from "@/lib/actions/class.action";
import { SearchParamProps } from "@/types/index";

const ManageClass = async ({ searchParams }: SearchParamProps) => {
  const user = await authUser();
  const userRole = getUserRole(user);

  const classListData = await getClassList({
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="p-4">
      <ManageClassSection classData={classListData} />
    </div>
  );
};

export default ManageClass;
