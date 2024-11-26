"use client";
import { PaginationProps } from "~/components/Pagination/types";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { cn } from "~/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  if (totalPages <= 1) return;

  const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
  const endPage = Math.max(3, Math.min(currentPage + 1, totalPages));

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const linkClass = (disabled: boolean) =>
    cn(
      "size-8 flex justify-center items-center border rounded-lg text-xs",
      disabled ? "cursor-not-allowed opacity-50" : "hover:bg-neutral-700"
    );

  const nextQuery = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return "#";
    const params = new URLSearchParams(searchParams);
    params.set("page", `${nextPage}`);
    return { pathname, query: params.toString() };
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <Link
        href={nextQuery(currentPage - 1)}
        className={linkClass(currentPage === 1)}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="size-5" />
      </Link>

      {pageNumbers.map((page) => (
        <Link
          href={nextQuery(page)}
          key={page}
          className={cn(
            "size-8 flex justify-center items-center border rounded-lg text-xs",
            currentPage === page ? "bg-neutral-700" : "hover:bg-neutral-800"
          )}
          aria-label={`Page ${page}`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={nextQuery(currentPage + 1)}
        className={linkClass(currentPage === totalPages)}
        aria-label="Next page"
      >
        <ChevronRightIcon className="size-4" />
      </Link>
    </div>
  );
};

export default Pagination;
