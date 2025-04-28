/**
 * Emoji 工具函数
 */

// 验证 emoji 是否有效
function isValidEmoji(code) {
  const emojiRegex = /[\p{Emoji}]/u;
  return emojiRegex.test(code);
}

// 创建 emoji 元素
function createEmojiElement(code, size) {
  const element = document.createElement("span");
  element.style.fontSize = `${size}px`;
  element.style.display = "inline-block";
  element.style.lineHeight = "1";
  element.style.verticalAlign = "middle";

  // 设置 emoji 内容
  element.textContent = isValidEmoji(code) ? code : "❓";

  return element;
}

// 导出工具函数
export function createEmoji(code, size) {
  return createEmojiElement(code, size);
}

// 导出验证函数
export function validateEmoji(code) {
  return isValidEmoji(code);
}
