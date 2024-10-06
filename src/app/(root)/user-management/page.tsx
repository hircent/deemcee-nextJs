import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { User } from "@/types/index";
import React from "react";

const UserManagement = async () => {

  const user = await authUser()
  const userRole = getUserRole(user)

  return (
    <div className="home-content">UserManagement</div>
  );
};

export default UserManagement;
