"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchProps } from "~/components/Search/types";

export const Search = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("page", "1");
      params.set("query", term);
    } else {
      params.delete("page");
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer transition-all duration-100 block w-full text-white rounded-lg bg-neutral-800 py-2 pl-10 text-sm outline-2 placeholder:text-white focus:outline-none focus:bg-neutral-700 focus:ring-2 focus:ring-gray-400"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white peer-focus:text-white" />
    </div>
  );
};
