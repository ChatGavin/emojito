import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 emoji-test.txt 文件
const emojiTestPath = path.join(__dirname, "../src/data/emoji-test.txt");
const outputPath = path.join(__dirname, "../src/data/emojis.json");

// 解析函数
function parseEmojiTest(content) {
  const lines = content.split("\n");
  const emojis = [];
  let currentGroup = "";
  let currentSubgroup = "";

  for (const line of lines) {
    // 跳过空行和注释
    if (!line || line.startsWith("#")) {
      // 提取分组信息
      if (line.includes("# group:")) {
        currentGroup = line.split("# group:")[1].trim();
      }
      if (line.includes("# subgroup:")) {
        currentSubgroup = line.split("# subgroup:")[1].trim();
      }
      continue;
    }

    // 解析 emoji 行
    const parts = line.split(";");
    if (parts.length < 2) continue;

    const [codepoints, status] = parts;
    const description = line.split("#")[1]?.trim() || "";

    // 提取 emoji 字符
    const emoji = String.fromCodePoint(
      ...codepoints
        .trim()
        .split(" ")
        .map((hex) => parseInt(hex, 16))
    );

    // 提取版本信息
    const versionMatch = description.match(/E\d+\.\d+/);
    const version = versionMatch ? versionMatch[0] : "";

    // 提取描述
    const desc = description
      .replace(version, "")
      .trim()
      .replace(/^[A-Z]/, (c) => c.toLowerCase());

    emojis.push({
      id: emojis.length + 1,
      emoji,
      codepoints: codepoints.trim(),
      status: status.trim(),
      version,
      description: desc,
      group: currentGroup,
      subgroup: currentSubgroup,
    });
  }

  return emojis;
}

// 主函数
async function main() {
  try {
    const content = fs.readFileSync(emojiTestPath, "utf8");
    const emojis = parseEmojiTest(content);

    // 写入 JSON 文件
    fs.writeFileSync(outputPath, JSON.stringify(emojis, null, 2), "utf8");

    console.log(`Successfully parsed ${emojis.length} emojis`);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
