import { useAuthContext } from "@/context/userContext";
import React from "react";

const Actions = () => {
  const { userRole } = useAuthContext();
  console.log(userRole);
  return (
    <div>
      {userRole.includes("superadmin") ? (
        <div className="flex gap-4">
          <p>Edit</p>
          <p>Delete</p>
        </div>
      ) : (
        <div>
          <p>View</p>
        </div>
      )}
    </div>
  );
};

export default Actions;
