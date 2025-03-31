"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q");

  const [search, setSearch] = useState<string>(query || "");
  const handleGlobalSearch = (val: string) => {
    setSearch(val);
  };

  useEffect(() => {
    setSearch("");
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = new URLSearchParams(searchParams?.toString() || "");
      if (search) {
        newUrl.delete("page");
        newUrl.set("q", search);
      } else {
        newUrl.delete("q");
      }

      router.push(pathname + "?" + newUrl.toString(), { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, searchParams, router, pathname, query]);

  return (
    <div className="relative flex flex-shrink-0 w-64">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 bg-yellow-2"
        placeholder={"Search by name"}
        onChange={(e) => handleGlobalSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default SearchBar;
