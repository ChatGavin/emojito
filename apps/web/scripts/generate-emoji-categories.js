import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取原始 emoji 数据
const emojisPath = path.join(__dirname, "../src/data/emojis.json");
const outputPath = path.join(__dirname, "../src/data/emoji-categories.json");

// 生成分类数据
function generateCategories(emojis) {
  // 按组和子组分类
  const categories = emojis.reduce((acc, emoji) => {
    const { group, subgroup } = emoji;

    if (!acc[group]) {
      acc[group] = {
        id: group.toLowerCase().replace(/\s+/g, "-"),
        name: group,
        count: 0,
        subgroups: {},
      };
    }

    if (!acc[group].subgroups[subgroup]) {
      acc[group].subgroups[subgroup] = {
        id: subgroup.toLowerCase().replace(/\s+/g, "-"),
        name: subgroup,
        count: 0,
        emojis: [],
      };
    }

    // 添加 emoji 到子组
    acc[group].subgroups[subgroup].emojis.push({
      id: emoji.id,
      emoji: emoji.emoji,
      description: emoji.description,
      version: emoji.version,
      codepoints: emoji.codepoints,
      status: emoji.status,
    });

    // 更新计数
    acc[group].subgroups[subgroup].count++;
    acc[group].count++;

    return acc;
  }, {});

  // 转换为数组格式并排序
  return Object.values(categories).map((group) => ({
    ...group,
    subgroups: Object.values(group.subgroups).sort((a, b) => {
      // 首先按照子组名称排序
      const nameCompare = a.name.localeCompare(b.name);
      if (nameCompare !== 0) return nameCompare;

      // 如果名称相同，按照 emoji 数量排序
      return b.count - a.count;
    }),
  }));
}

// 主函数
async function main() {
  try {
    // 读取原始数据
    const emojis = JSON.parse(fs.readFileSync(emojisPath, "utf8"));

    // 生成分类数据
    const categories = generateCategories(emojis);

    // 写入新文件
    fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2), "utf8");

    console.log(
      `Successfully generated categories for ${emojis.length} emojis`
    );
    console.log(
      `Found ${categories.length} groups and ${categories.reduce(
        (acc, group) => acc + group.subgroups.length,
        0
      )} subgroups`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
