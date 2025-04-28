/**
 * Emojito Core
 * A utility library for working with emojis
 */

import { createEmoji, validateEmoji } from "./emoji";
import pkg from "../package.json";

// 导出版本号
export const version = pkg.version;

// 导出 emoji 相关功能
export { createEmoji, validateEmoji };

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
