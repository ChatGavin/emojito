import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// 导入 emoji 分类数据
import emojiCategories from "@/data/emoji-categories.json";

export const Sider = () => {
  // 使用 Map 来存储每个组的折叠状态，默认展开第一个组
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const map = new Map();
    if (emojiCategories.length > 0) {
      map.set(emojiCategories[0].id, true);
    }
    return map;
  });

  // 当前激活的 subgroup id（你可以根据实际路由或状态传递）
  const [activeSubgroup, setActiveSubgroup] = useState(null);

  // 切换组的折叠状态
  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => {
      const next = new Map(prev);
      next.set(groupId, !next.get(groupId));
      return next;
    });
  };

  // 滚动到指定元素
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="h-full bg-white border-r">
      <div className="h-full overflow-y-auto">
        <div className="flex flex-col space-y-0 p-2">
          {emojiCategories.map((group) => (
            <div key={group.id} className="space-y-1">
              <div
                className="flex items-center justify-between cursor-pointer px-2 py-1 text-[13px] font-medium rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => toggleGroup(group.id)}
              >
                <span className="truncate">{group.name}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">
                    {group.count}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedGroups.get(group.id) ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  expandedGroups.get(group.id) ? "max-h-none" : "max-h-0"
                }`}
              >
                <div className="space-y-0">
                  {group.subgroups.map((subgroup) => (
                    <div key={subgroup.id}>
                      <button
                        onClick={() => {
                          setActiveSubgroup(subgroup.id);
                          scrollToElement(subgroup.id);
                        }}
                        className={`flex items-center w-full px-2 py-1 text-[13px] rounded-md transition-colors hover:bg-gray-100 ${
                          activeSubgroup === subgroup.id ? "bg-gray-100" : ""
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="text-base">
                            {subgroup.emojis[0]?.emoji}
                          </span>
                          <span className="truncate">{subgroup.name}</span>
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {subgroup.count}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
