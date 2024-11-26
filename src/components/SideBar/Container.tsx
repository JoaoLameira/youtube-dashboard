"use client";

import React from "react";
import { cn } from "~/utils";
import { useSidebarContext } from "~/components/SideBar/Context";

const SidebarContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen } = useSidebarContext();

  return (
    <div className="pr-1">
      <div
        className={cn(
          "flex flex-col h-screen transition-all duration-300",
          isOpen ? "w-80" : "w-16"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarContainer;
