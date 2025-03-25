"use client";
import { SectionNavLink } from "@/types/index";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SectionNav = ({
  links,
  userRole,
}: {
  links: SectionNavLink[];
  userRole:
    | "superadmin"
    | "principal"
    | "manager"
    | "teacher"
    | "student"
    | "parent";
}) => {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 border-b border-gray-200 pb-2">
      {links.map((link) => {
        if (link.visible.includes(userRole)) {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 text-sm font-medium transition-colors duration-200
                        ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-500"
                        }
                        group
                    `}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full transform transition-transform duration-200 ease-out
                        ${
                          isActive
                            ? "bg-blue-600 scale-x-100"
                            : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                        }
                    `}
              />
            </Link>
          );
        }
      })}
    </div>
  );
};

export default SectionNav;
