"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginationProps } from "@/types/index";

const Pagination = ({
  next,
  previous,
  baseUrl,
  totalItems,
  pageSize,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams?.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  // Calculate total pages based on the API response
  // We can derive this from the next URL or pass it directly as a prop
  const getLastPage = () => {
    if (!next) return currentPage; // If no next, we're on the last page

    // Try to extract total and page_size from parent component props
    // This is a placeholder - you'll need to adjust based on your actual data structure

    return Math.ceil(totalItems / pageSize);
  };

  const lastPage = getLastPage();

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

  const renderPageNumbers = () => {
    const pages = [];

    // Logic to determine which page numbers to show
    // Show at most 5 page numbers around the current page
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page button (always show)
    if (startPage > 1) {
      pages.push(
        <Button
          key="page-1"
          className={`${buttonBaseStyle} ${
            currentPage === 1
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border border-green-600"
          }`}
        >
          <Link href={createUrlWithParams(1)} className="w-full text-center">
            1
          </Link>
        </Button>
      );

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-1" className="px-2 flex items-center">
            ...
          </span>
        );
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={`page-${i}`}
          className={`${buttonBaseStyle} ${
            currentPage === i
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border border-green-600"
          }`}
        >
          <Link href={createUrlWithParams(i)} className="w-full text-center">
            {i}
          </Link>
        </Button>
      );
    }

    // Last page button (always show if not already included)
    if (endPage < lastPage) {
      // Add ellipsis if needed
      if (endPage < lastPage - 1) {
        pages.push(
          <span key="ellipsis-2" className="px-2 flex items-center">
            ...
          </span>
        );
      }

      pages.push(
        <Button
          key={`page-${lastPage}`}
          className={`${buttonBaseStyle} ${
            currentPage === lastPage
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border border-green-600"
          }`}
        >
          <Link
            href={createUrlWithParams(lastPage)}
            className="w-full text-center"
          >
            {lastPage}
          </Link>
        </Button>
      );
    }

    return pages;
  };

  const buttonBaseStyle =
    "p-2 min-w-10 transition-all duration-200 font-medium text-sm hover:shadow-md mx-1";
  const activeButtonStyle = `${buttonBaseStyle} bg-green-600 hover:bg-green-700 text-white border-none`;

  return (
    <div className="flex mt-4 justify-end">
      <div className="flex flex-wrap bg-yellow-2 rounded-md p-2 gap-2 items-center">
        {/* Previous button */}
        {previous ? (
          <Button className={activeButtonStyle}>
            <Link
              href={createUrlWithParams(currentPage > 1 ? currentPage - 1 : 1)}
              className="w-full text-center"
            >
              Previous
            </Link>
          </Button>
        ) : (
          <Button
            className={`${buttonBaseStyle} bg-green-400 text-white cursor-not-allowed`}
            disabled
          >
            Previous
          </Button>
        )}

        {/* Page number buttons */}
        <div className="flex items-center">{renderPageNumbers()}</div>

        {/* Next button */}
        {next ? (
          <Button className={activeButtonStyle}>
            <Link
              href={createUrlWithParams(currentPage + 1)}
              className="w-full text-center"
            >
              Next
            </Link>
          </Button>
        ) : (
          <Button
            className={`${buttonBaseStyle} bg-green-400 text-white cursor-not-allowed`}
            disabled
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
