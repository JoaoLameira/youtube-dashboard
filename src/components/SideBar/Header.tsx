"use client";
import React, { useEffect } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { cn } from "~/utils";
import { useAtom } from "jotai";
import { isOpen } from "~/store";

const SidebarHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setIOpen] = useAtom(isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isMenuOpen) setIOpen(true);
      if (window.innerWidth > 768 && isMenuOpen) setIOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIOpen, isMenuOpen]);

  return (
    <div className="p-4 bg-background space-y-2">
      <div
        className={cn("flex", !isMenuOpen ? "justify-end" : "justify-center")}
      >
        <button onClick={() => setIOpen((prev) => !prev)}>
          {isMenuOpen ? (
            <Bars3Icon className="size-5" />
          ) : (
            <XMarkIcon className="size-5" />
          )}
        </button>
      </div>
      <div className={cn(isMenuOpen && "hidden")}>{children}</div>
    </div>
  );
};

export default SidebarHeader;
