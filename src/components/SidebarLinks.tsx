'use client';

import { sidebarLinks } from "@/constants/index";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const SidebarLinks = ({userRole}:{userRole:string[]}) => {
const pathName = usePathname();
  return (
    <nav className="flex flex-col gap-1 text-sm p-4 pt-0">
        {sidebarLinks.map((item) => {
          const isVisible = userRole.some(role => item.visible.includes(role));
        
          if (!isVisible) return null;

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
          })}
      </nav>
  )
}

export default SidebarLinks
