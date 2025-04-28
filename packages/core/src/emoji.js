/**
 * Emojito 组件
 */

import React from "react";

// 验证 emoji 编码
function validateEmoji(code) {
  // 支持 emoji 字符
  if (/^[\p{Emoji}]$/u.test(code)) {
    return true;
  }
  // 支持 Unicode 码点格式 (U+1F60A)
  if (/^U\+[0-9A-F]{4,6}$/i.test(code)) {
    return true;
  }
  return false;
}

// 将 Unicode 码点转换为 emoji 字符
function unicodeToEmoji(code) {
  if (code.startsWith("U+")) {
    const hex = code.slice(2);
    return String.fromCodePoint(parseInt(hex, 16));
  }
  return code;
}

// 限制 size 范围
function clampSize(size) {
  return Math.min(Math.max(size, 12), 48);
}

// Emojito 组件
export default function Emojito({ code, size = 24 }) {
  if (!validateEmoji(code)) {
    return null;
  }

  const emoji = unicodeToEmoji(code);
  const clampedSize = clampSize(size);

  return React.createElement(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${clampedSize}px`,
        height: `${clampedSize}px`,
        fontSize: `${clampedSize * 0.8}px`,
        lineHeight: 1,
        padding: "4px",
        margin: 0,
        boxSizing: "border-box",
        backgroundColor: "#f6f6f7",
        borderRadius: "6px",
      },
    },
    emoji
  );
}

// 获取 emoji 样式
export function getEmojiStyle(size = 24) {
  return {
    fontSize: `${size}px`,
    lineHeight: 1,
    display: "inline-block",
  };
}
