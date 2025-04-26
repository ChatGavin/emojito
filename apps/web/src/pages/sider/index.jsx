import React from "react";
import { Home, Settings, Users, FileText, HelpCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "首页",
    icon: Home,
    href: "/",
  },
  {
    title: "文档",
    icon: FileText,
    href: "/docs",
  },
  {
    title: "团队",
    icon: Users,
    href: "/team",
  },
  {
    title: "设置",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "帮助",
    icon: HelpCircle,
    href: "/help",
  },
];

export const Sider = () => {
  return (
    <Sidebar variant="inset" collapsible="none" className="h-full">
      <SidebarContent className="h-full overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>导航菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
