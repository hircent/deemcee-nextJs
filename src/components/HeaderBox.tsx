"use client";

import { HeaderBoxProps } from "@/types/index";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { BranchSelector } from "./BranchSelector";

const HeaderBox = ({ type, title, user, subtext }: HeaderBoxProps) => {
  const router = useRouter();
  const userSignOut = async () => {
    await signOut();
    router.refresh();
    router.push("/sign-in");
  };
  return (
    <div className="flex justify-between">
      <div className="header-box">
        <h1 className="header-box-title">
          {title}
          {type === "greeting" && (
            <span className="text-bankGradient">&nbsp;{user?.username}</span>
          )}
        </h1>
        {/* <p className="header-box-subtext">{subtext}</p> */}
      </div>
      <div className="flex justify-center">
        <BranchSelector userRole={user.branch_role} />
      </div>
      <div>
        <Button onClick={userSignOut}>SignOut</Button>
      </div>
    </div>
  );
};

export default HeaderBox;
