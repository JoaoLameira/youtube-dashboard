"use client";
import React from "react";
import { useSidebarContext } from "./Context";
import { cn } from "~/utils";

const SidebarContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen } = useSidebarContext();

  return (
    <div
      className={cn(
        "flex flex-col bg-background text-white flex-1 overflow-y-auto overflow-x-hidden pl-4 pr-1 my-2 py-0.5",
        isOpen ? "delay-300 opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
};

export default SidebarContent;
