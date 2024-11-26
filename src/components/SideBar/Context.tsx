"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = (): SidebarContextType => {
  const context = useContext(SidebarContext);

  if (!context)
    throw new Error("useSidebarContext must be used within a SidebarProvider");

  return context;
};

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
