#!/bin/bash

# 设置工作目录
cd "$(dirname "$0")/.."

# 创建必要的目录
mkdir -p src/data

# 下载 emoji-test.txt
echo "Downloading emoji-test.txt..."
curl -o src/data/emoji-test.txt https://unicode.org/Public/emoji/latest/emoji-test.txt

# 运行解析脚本
echo "Parsing emoji data..."
node scripts/parse-emoji-test.js

echo "Done! Emoji data has been processed and saved to src/data/emojis.json" 