"use client";
import { useAtomValue } from "jotai";
import React from "react";
import { cn } from "~/utils";
import { isOpen } from "~/store";

const SidebarContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMenuOpen = useAtomValue(isOpen);

  return (
    <div
      className={cn(
        "flex flex-col bg-background flex-1 overflow-y-auto overflow-x-hidden pl-4 pr-2 my-2 py-0.5 min-w-80",
        isMenuOpen && "hidden"
      )}
    >
      {children}
    </div>
  );
};

export default SidebarContent;
