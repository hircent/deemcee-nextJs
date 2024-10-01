"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { sidebarLinks } from "../../constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/userContext";

const Sidebar = () => {
  const pathName = usePathname();
  const { user, isLoading } = useAuthContext();
  return (
    <section className="flex flex-col w-[18%] md:w-[13%] lg:w-[16%] xl:w-[14%] overflow-y-scroll custom-scrollbar">
      <div className="bg-white p-4 sticky top-0 z-10 ">
        <Link
          href="/"
          className="cursor-pointer flex gap-2 sticky top-0 bg-white items-center justify-center xl:justify-start"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Deemcee Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Deemcee</h1>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 text-sm p-4 pt-0">
        {isLoading ? (
          <>
            {" "}
            <p>Loading...</p>
          </>
        ) : (
          sidebarLinks.map((item) => {
            const isActive =
              pathName === item.route || pathName.startsWith(`${item.route}/`);
            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  "flex items-center justify-center lg:justify-start gap-2 text-gray-500 py-2 md:px-2 rounded-md hover:bg-slate-400",
                  {
                    "bg-bank-gradient": isActive,
                  }
                )}
              >
                <div className="relative size-6">
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={cn({
                      "brightness-[3] invert-0": isActive,
                    })}
                  />
                </div>
                <p
                  className={cn("hidden lg:block", {
                    "!text-white": isActive,
                  })}
                >
                  {item.label}
                </p>
              </Link>
            );
          })
        )}
      </nav>
    </section>
  );
};

export default Sidebar;
