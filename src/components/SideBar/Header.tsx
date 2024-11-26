"use client";
import React from "react";
import { useSidebarContext } from "~/components/SideBar/Context";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { cn } from "~/utils";

const SidebarHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <div className="p-4 bg-background space-y-2">
      <div className={cn("flex", isOpen ? "justify-end" : "justify-center")}>
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <XMarkIcon className="size-5" />
          ) : (
            <Bars3Icon className="size-5" />
          )}
        </button>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default SidebarHeader;
