import { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";

// 防抖函数
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const useSearch = (emojiCategories) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // 准备搜索数据
  const searchData = useMemo(() => {
    return emojiCategories.flatMap((category) =>
      category.subgroups.flatMap((subgroup) =>
        subgroup.emojis.map((emoji) => ({
          ...emoji,
          categoryName: category.name,
          subgroupName: subgroup.name,
        }))
      )
    );
  }, [emojiCategories]);

  // 配置 Fuse 选项
  const fuseOptions = {
    keys: [
      { name: "name", weight: 2 },
      { name: "description", weight: 1 },
      { name: "categoryName", weight: 0.5 },
      { name: "subgroupName", weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
    useExtendedSearch: true,
    ignoreLocation: true,
    minMatchCharLength: 1,
    shouldSort: true,
    findAllMatches: true,
    location: 0,
    distance: 100,
  };

  // 创建 Fuse 实例
  const fuse = useMemo(() => new Fuse(searchData, fuseOptions), [searchData]);

  // 防抖处理搜索
  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedQuery(value);
    }, 300),
    []
  );

  // 处理搜索输入
  const handleSearch = useCallback(
    (value) => {
      setSearchQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!debouncedQuery) return null;
    return fuse.search(debouncedQuery).map((result) => result.item);
  }, [fuse, debouncedQuery]);

  return {
    searchQuery,
    setSearchQuery: handleSearch,
    searchResults,
  };
};
