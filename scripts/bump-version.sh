#!/bin/bash

# 获取当前目录
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 获取最新的远程 tag
git fetch --tags
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "0.0.0")
LATEST_VERSION=${LATEST_TAG#v}

# 增加 patch 版本号
NEW_VERSION=$(node -p "require('semver').inc('$LATEST_VERSION', 'patch')")

# 更新所有包的版本号
cd "$ROOT_DIR" && pnpm version $NEW_VERSION --no-git-tag-version
cd "$ROOT_DIR/apps/web" && pnpm version $NEW_VERSION --no-git-tag-version
cd "$ROOT_DIR/packages/core" && pnpm version $NEW_VERSION --no-git-tag-version

echo "✨ 所有包已更新到版本 $NEW_VERSION" 