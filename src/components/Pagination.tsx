"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginationProps } from "@/types/index";

const Pagination = ({ next, previous, baseUrl }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams?.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const createUrlWithParams = (pageNumber?: number) => {
    // Create a new URLSearchParams instance from the current searchParams
    const params = new URLSearchParams(searchParams?.toString() || "");

    // If we're going to page 1, remove the page parameter entirely
    if (pageNumber === 1) {
      params.delete("page");
    } else if (pageNumber) {
      params.set("page", pageNumber.toString());
    }

    const queryString = params.toString();
    return `${baseUrl}${queryString ? `?${queryString}` : ""}`;
  };

  const getPageUrl = (type: "next" | "previous") => {
    if (type === "next") {
      return createUrlWithParams(currentPage + 1);
    }
    if (currentPage === 2) {
      return createUrlWithParams(1);
    }
    return createUrlWithParams(currentPage - 1);
  };

  const buttonBaseStyle =
    "p-4 w-24 transition-all duration-200 font-medium text-sm hover:shadow-md";
  const activeButtonStyle = `${buttonBaseStyle} bg-green-600 hover:bg-green-700 text-white border-none`;

  return (
    <div className="flex gap-3 mt-4 justify-end">
      {previous && (
        <Button className={activeButtonStyle}>
          <Link href={getPageUrl("previous")} className="w-full text-center">
            Previous
          </Link>
        </Button>
      )}

      {!previous && (
        <Button
          className={`${buttonBaseStyle} bg-green-400 text-white cursor-not-allowed`}
          disabled
        >
          Previous
        </Button>
      )}

      {next && (
        <Button className={activeButtonStyle}>
          <Link href={getPageUrl("next")} className="w-full text-center">
            Next
          </Link>
        </Button>
      )}

      {!next && (
        <Button
          className={`${buttonBaseStyle} bg-green-400 text-white cursor-not-allowed`}
          disabled
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
