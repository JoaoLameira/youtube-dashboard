import React from "react";
import { MainViewProps } from "~/components/MainView/types";
import { cn } from "~/utils";

export const MainView = ({ children, className }: MainViewProps) => {
  return (
    <div
      className={cn(
        "h-full bg-neutral-800 p-5 sm:p-10 lg:p-20 overflow-x-hidden overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
