import React from "react";
import { MainViewProps } from "~/components/MainView/types";
import { cn } from "~/utils";

export const MainView = ({ children, className }: MainViewProps) => {
  return (
    <div className={cn("h-full bg-neutral-800 p-20", className)}>
      {children}
    </div>
  );
};
