import React from "react";
import { MainViewProps } from "~/components/MainView/types";
import { cn } from "~/utils";

export const MainView = ({ children, className }: MainViewProps) => {
  return (
    <div
      className={cn(
        "h-full bg-neutral-800 px-5 sm:px-10 lg:px-20 py-20 overflow-x-hidden overflow-y-auto ml-16 md:ml-0",
        className
      )}
    >
      {children}
    </div>
  );
};
