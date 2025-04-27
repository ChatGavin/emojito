import React, { useEffect } from "react";
import emojiCategories from "@/data/emoji-categories.json";
import { useSearch } from "./useSearch";
import { useToast } from "@/hooks/use-toast";

const Search = ({ onSearch }) => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4 z-50">
      <div className="h-14 flex items-center">
        <input
          type="search"
          placeholder="搜索表情..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full h-8 px-4 text-sm border rounded"
        />
      </div>
    </div>
  );
};

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
  const { searchQuery, setSearchQuery, searchResults } =
    useSearch(emojiCategories);
  const { toast } = useToast();

  // 添加全局右键事件阻止
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const handleCopy = (emoji) => {
    navigator.clipboard.writeText(emoji);
    toast({
      title: "左键复制成功",
      description: "表情已复制到剪贴板",
    });
  };

  const handleContextMenu = (e, emoji) => {
    e.preventDefault();
    const code = emoji.codePointAt(0).toString(16);
    const codeText = `U+${code.toUpperCase()}`;
    navigator.clipboard.writeText(codeText);
    toast({
      title: "右键复制成功",
      description: `表情编码 ${codeText} 已复制到剪贴板`,
    });
  };

  // 渲染搜索结果或所有表情
  const renderEmojis = () => {
    if (searchResults) {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">搜索结果</h2>
            <span className="text-sm text-gray-500">
              共 {searchResults.length} 个表情
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchResults.map((emoji) => (
              <div
                key={emoji.id}
                className="flex items-center justify-center w-12 h-12 text-2xl hover:bg-gray-100 rounded-lg cursor-pointer"
                title={`${emoji.description}\n左键复制表情，右键复制编码`}
                onClick={() => handleCopy(emoji.emoji)}
                onContextMenu={(e) => handleContextMenu(e, emoji.emoji)}
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return emojiCategories.map((category) => (
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
                  title={`${emoji.description}\n左键复制表情，右键查看编码`}
                  onClick={() => handleCopy(emoji.emoji)}
                  onContextMenu={(e) => handleContextMenu(e, emoji.emoji)}
                >
                  {emoji.emoji}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="flex-1 w-full overflow-y-auto">
      <div className="pt-6 pb-6 px-6">
        <div className="space-y-8 w-full">{renderEmojis()}</div>
        <Footer />
      </div>
      <Search onSearch={setSearchQuery} />
    </div>
  );
};
