"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "../../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNavbar = () => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/"
            className="cursor-pointer flex items-center justify-center gap-1 px-4"
          >
            <Image
              src="/images/logo-ver.png"
              width={50}
              height={50}
              alt="Deemcee logo"
            />
          </Link>

          <div className="mobilenav-sheet">
            {/* asChild is the child of the sheet */}
            {/* <SheetClose asChild> */}
            <nav className="flex h-full flex-col gap-2 pt-2 text-white items-center">
              {sidebarLinks.map((item) => {
                const isActive =
                  pathName === item.route ||
                  pathName?.startsWith(`${item.route}/`);
                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      key={item.label}
                      className={cn("mobilenav-sheet_close w-full", {
                        "bg-bank-gradient": isActive,
                      })}
                    >
                      <item.icon
                        width={20}
                        height={20}
                        className={cn({
                          "brightness-[3] invert-0": isActive,
                        })}
                      />
                      <p
                        className={cn("text-16 font-semibold text-black-2", {
                          "text-white": isActive,
                        })}
                      >
                        {item.label}
                      </p>
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
