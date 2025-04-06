import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUserRole } from "@/lib/utils";
import SidebarLinks from "./SidebarLinks";
import { User } from "@/types/index";

const Sidebar = async ({ user }: { user: User | undefined }) => {
  const userRole = getUserRole(user);

  return (
    <section className="flex flex-col w-[18%] md:w-[13%] lg:w-[16%] xl:w-[17%] overflow-y-scroll custom-scrollbar">
      <div className="bg-yellow-2 p-4 sticky top-0 z-10 ">
        <Link
          href="/"
          className="cursor-pointer flex gap-2 sticky top-0 items-center justify-center"
        >
          <Image
            src="/images/logo-ver.svg"
            width={80}
            height={80}
            alt="Deemcee Logo"
            className="size-[40px] lg:size-[80px]"
          />
          <h1 className="sidebar-logo"></h1>
        </Link>
      </div>
      <SidebarLinks userRole={userRole} />
    </section>
  );
};

export default Sidebar;
