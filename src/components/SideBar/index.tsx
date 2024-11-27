import React from "react";
import SidebarHeader from "~/components/SideBar/Header";
import SidebarContent from "~/components/SideBar/Content";
import SidebarFooter from "~/components/SideBar/Footer";
import SidebarContainer from "~/components/SideBar/Container";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> & {
  Header: typeof SidebarHeader;
  Content: typeof SidebarContent;
  Footer: typeof SidebarFooter;
} = ({ children }) => {
  return <SidebarContainer>{children}</SidebarContainer>;
};

Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;

export default Sidebar;
