/**
 * Emojito Core
 * A utility library for working with emojis
 */

// 导出所有工具函数
export const version = "0.0.1";

// 示例函数：检查字符串是否包含 emoji
export function hasEmoji(str) {
  const emojiRegex = /[\p{Emoji}]/u;
  return emojiRegex.test(str);
}

// 示例函数：提取字符串中的所有 emoji
export function extractEmojis(str) {
  const emojiRegex = /[\p{Emoji}]/gu;
  return str.match(emojiRegex) || [];
}
