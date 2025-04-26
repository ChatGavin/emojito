import React from "react";
import emojiCategories from "@/data/emoji-categories.json";

const Footer = () => {
  // 获取 emoji 总数量
  const total = emojiCategories.reduce(
    (sum, group) => sum + (group.count || 0),
    0
  );
  // 更新时间（可根据实际情况替换为动态时间）
  const updateTime = "2025-05";
  return (
    <div className="mt-6 border-t pt-4">
      <div className="text-center pb-2">© Powered by Gavin Lin</div>
      <div className="text-center text-xs text-gray-500">
        更新时间：{updateTime} ｜ Emoji 总数量：{total}
      </div>
    </div>
  );
};

export const Content = () => {
  return (
    <div className="flex-1 h-full w-full overflow-y-auto pt-6 pr-6 pl-6 pb-6">
      <div className="space-y-8 w-full">
        {emojiCategories.map((category) => (
          <div
            key={category.id}
            id={category.id}
            className="space-y-4 scroll-mt-20"
          >
            {category.subgroups.map((subgroup) => (
              <div
                key={subgroup.id}
                id={subgroup.id}
                className="space-y-2 scroll-mt-20"
              >
                <h2 className="text-xl font-semibold">{subgroup.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {subgroup.emojis.map((emoji) => (
                    <div
                      key={emoji.id}
                      className="flex items-center justify-center w-12 h-12 text-2xl hover:bg-gray-100 rounded-lg cursor-pointer"
                      title={emoji.description}
                    >
                      {emoji.emoji}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
