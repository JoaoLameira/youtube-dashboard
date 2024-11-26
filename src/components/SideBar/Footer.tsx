"use client";
import React from "react";
import { cn } from "~/utils";
import { useSidebarContext } from "./Context";

const SidebarFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen } = useSidebarContext();
  return (
    <div
      className={cn(
        "p-4 bg-background text-center text-white",
        isOpen ? "delay-300 opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
};

export default SidebarFooter;
