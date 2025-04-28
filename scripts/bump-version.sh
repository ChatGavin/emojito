#!/bin/bash

# 获取当前目录
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 更新主项目版本号并创建 tag
pnpm version patch

# 获取新版本号
NEW_VERSION=$(node -p "require('./package.json').version")

# 更新子包版本号
cd "$ROOT_DIR/apps/web" && npm version $NEW_VERSION --allow-same-version --no-git-tag-version
cd "$ROOT_DIR/packages/core" && npm version $NEW_VERSION --allow-same-version --no-git-tag-version

echo "✨ 所有包已更新到版本 $NEW_VERSION" 