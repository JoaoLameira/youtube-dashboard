"use client";
import React from "react";
import { cn } from "~/utils";
import { useAtomValue } from "jotai";
import { isOpen } from "~/store";

const SidebarContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMenuOpen = useAtomValue(isOpen);
  return (
    <div className="pr-1">
      <div
        className={cn(
          "flex flex-col h-screen absolute bg-background md:relative z-10 transition-all duration-300 overflow-hidden",
          !isMenuOpen ? "w-80" : "w-16"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarContainer;
