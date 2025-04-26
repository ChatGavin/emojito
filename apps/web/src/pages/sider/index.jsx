import React from "react";
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

// 导入 emoji 分类数据
import emojiCategories from "@/data/emoji-categories.json";

export const Sider = () => {
  return (
    <Sidebar variant="inset" collapsible="none" className="h-full">
      <SidebarContent className="h-full overflow-y-auto pb-20">
        {emojiCategories.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel className="flex items-center justify-between">
              <span>{group.name}</span>
              <span className="text-sm text-muted-foreground">
                {group.count}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.subgroups.map((subgroup) => (
                  <SidebarMenuItem key={subgroup.id}>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => {
                          const element = document.getElementById(subgroup.id);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="flex items-center justify-between w-full"
                      >
                        <span className="flex items-center space-x-2">
                          <span className="text-lg">
                            {subgroup.emojis[0]?.emoji}
                          </span>
                          <span>{subgroup.name}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {subgroup.count}
                        </span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
