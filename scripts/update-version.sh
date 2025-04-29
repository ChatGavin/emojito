#!/bin/bash

# 获取当前目录
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 获取最新的远程 tag
git fetch --tags
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "0.0.0")
LATEST_VERSION=${LATEST_TAG#v}

# 增加 patch 版本号
NEW_VERSION=$(node -p "require('semver').inc('$LATEST_VERSION', 'patch')")

echo "当前线上版本: $LATEST_VERSION"
echo "新版本号: $NEW_VERSION"
read -p "是否更新到 $NEW_VERSION? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  # 更新根目录版本号
  cd "$ROOT_DIR" && pnpm version $NEW_VERSION --no-git-tag-version
  
  # 更新 web 应用版本号
  cd "$ROOT_DIR/apps/web" && pnpm version $NEW_VERSION --no-git-tag-version && cd ../..
  
  # 更新 core 包版本号
  cd "$ROOT_DIR/packages/core" && pnpm version $NEW_VERSION --no-git-tag-version && cd ../..
  
  echo "✨ 所有包已更新到版本 $NEW_VERSION"
  
  # 提交更改
  git add .
  git commit -m "chore: bump version to $NEW_VERSION"
else
  echo "已取消更新"
fi 