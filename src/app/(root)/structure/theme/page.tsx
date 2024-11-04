import React from 'react'
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";

const Page = async () => {
  const user = await authUser();
  const userRole = getUserRole(user)
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Theme</h1>
      </div>
    </div>
  )
}

export default Page
