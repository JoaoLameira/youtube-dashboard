"use client";
import React from "react";
import { ListItemProps } from "~/components/List/types";
import Link from "next/link";
import { cn } from "~/utils";
import { useParams, useSearchParams } from "next/navigation";

const ListItem = ({ title, description, videoId }: ListItemProps) => {
  const searchParams = useSearchParams();
  const pageParams = useParams();
  const params = new URLSearchParams(searchParams);
  const nextLink = () => `/video/${videoId}?${params.toString()}`;

  return (
    <Link
      className={cn(
        "bg-neutral-800 p-4 rounded-lg space-y-2 block hover:ring-2 hover:ring-gray-400 transition-all duration-100 hover:bg-neutral-700",
        pageParams.videoId === videoId && "bg-neutral-700 ring-gray-400 ring-2"
      )}
      href={nextLink()}
    >
      <h2 className="text-sm font-bold uppercase">{title}</h2>
      <p className="text-xs lowercase">{description}</p>
    </Link>
  );
};

export default ListItem;
