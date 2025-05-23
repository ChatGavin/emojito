#!/bin/bash

# 获取当前目录
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 如果提供了新版本号，则使用它
if [ ! -z "$1" ]; then
  NEW_VERSION=$1
else
  # 获取当前版本号
  CURRENT_VERSION=$(node -p "require('./package.json').version")

  # 拉取远程更改
  git pull origin master

  # 获取最新的远程 tag
  git fetch --tags
  LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "0.0.0")
  LATEST_VERSION=${LATEST_TAG#v}

  # 比较版本号
  if [ "$(node -p "require('semver').gt('$CURRENT_VERSION', '$LATEST_VERSION')")" = "true" ]; then
    # 如果当前版本大于线上版本，使用当前版本
    NEW_VERSION=$CURRENT_VERSION
    echo "使用当前版本 $NEW_VERSION（大于线上版本 $LATEST_VERSION）"
  else
    # 如果当前版本小于等于线上版本，使用线上版本并增加 patch
    NEW_VERSION=$(node -p "require('semver').inc('$LATEST_VERSION', 'patch')")
    echo "使用线上版本 $LATEST_VERSION 并增加 patch 到 $NEW_VERSION"
  fi
fi

# 如果是在 GitHub Actions 中运行，输出新版本号
if [ ! -z "$GITHUB_OUTPUT" ]; then
  echo "VERSION=$NEW_VERSION" >> $GITHUB_OUTPUT
  echo "NEW_VERSION=$NEW_VERSION" >> $GITHUB_OUTPUT
fi

# 检查根目录版本号
ROOT_VERSION=$(node -p "require('./package.json').version")
if [ "$ROOT_VERSION" != "$NEW_VERSION" ]; then
  cd "$ROOT_DIR" && pnpm version $NEW_VERSION --no-git-tag-version
fi

# 检查 web 应用版本号
WEB_VERSION=$(node -p "require('./apps/web/package.json').version")
if [ "$WEB_VERSION" != "$NEW_VERSION" ]; then
  cd "$ROOT_DIR/apps/web" && pnpm version $NEW_VERSION --no-git-tag-version && cd ../..
fi

# 检查 core 包版本号
CORE_VERSION=$(node -p "require('./packages/core/package.json').version")
if [ "$CORE_VERSION" != "$NEW_VERSION" ]; then
  cd "$ROOT_DIR/packages/core" && pnpm version $NEW_VERSION --no-git-tag-version && cd ../..
fi

# 提交版本更新
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
git add .
git commit -m "chore: bump version to $NEW_VERSION"

# 创建 tag（不带 v 前缀）
git tag -a "$NEW_VERSION" -m "Release $NEW_VERSION"

# 推送更改和 tag
git push origin master
git push origin "$NEW_VERSION"

echo "✨ 版本已更新到 $NEW_VERSION 并创建了 tag" 