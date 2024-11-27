"use client";
import { useAtomValue } from "jotai";
import React from "react";
import { isOpen } from "~/store";
import { cn } from "~/utils";

const SidebarFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMenuOpen = useAtomValue(isOpen);

  return (
    <div
      className={cn(
        "px-4 pb-8 pt-4 bg-background text-center min-w-80",
        isMenuOpen && "hidden"
      )}
    >
      {children}
    </div>
  );
};

export default SidebarFooter;
