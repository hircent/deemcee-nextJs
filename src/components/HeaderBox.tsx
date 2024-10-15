"use client";
import { User, LogOut } from 'lucide-react';
import { HeaderBoxProps } from "@/types/index";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { BranchSelector } from "./BranchSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';


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
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="h-7 w-7 rounded-full bg-slate-500 flex items-center justify-center text-white">{user?.username[0].toUpperCase()}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="bg-yellow-2"
            align="end" 
            alignOffset={-15}
            sideOffset={5}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <Link href={`/profile/${user.user_id}`} className="flex items-center gap-2">
                <User size={16} /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={userSignOut} className="flex items-center gap-2 px-0">
                <LogOut size={16} /> Sign Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HeaderBox;
