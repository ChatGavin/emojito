#!/bin/bash

# 获取当前目录
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 获取当前版本号
CURRENT_VERSION=$(node -p "require('./package.json').version")

# 获取最新的远程 tag
git fetch --tags
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "0.0.0")
LATEST_VERSION=${LATEST_TAG#v}

# 如果当前版本等于最新 tag 版本，则更新版本号
if [ "$CURRENT_VERSION" = "$LATEST_VERSION" ]; then
  # 自动增加 patch 版本号
  NEW_VERSION=$(node -p "require('semver').inc('$LATEST_VERSION', 'patch')")
  
  # 更新根目录版本号
  cd "$ROOT_DIR" && pnpm version $NEW_VERSION --no-git-tag-version
  
  # 更新 web 应用版本号
  cd "$ROOT_DIR/apps/web" && pnpm version $NEW_VERSION --no-git-tag-version && cd ../..
  
  # 更新 core 包版本号
  cd "$ROOT_DIR/packages/core" && pnpm version $NEW_VERSION --no-git-tag-version && cd ../..
  
  # 提交版本更新
  git config --local user.email "action@github.com"
  git config --local user.name "GitHub Action"
  git add .
  git commit -m "chore: bump version to $NEW_VERSION"
  
  # 创建 tag
  git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"
  
  # 推送更改和 tag
  git push origin master
  git push origin "v$NEW_VERSION"
  
  echo "✨ 版本已更新到 $NEW_VERSION 并创建了 tag"
else
  # 如果版本号不同，先同步远程版本
  echo "当前版本 $CURRENT_VERSION 与最新 tag 版本 $LATEST_VERSION 不同，同步远程版本"
  
  # 拉取远程更改
  git pull origin master
  
  # 自动增加 patch 版本号
  NEW_VERSION=$(node -p "require('semver').inc('$LATEST_VERSION', 'patch')")
  
  # 更新根目录版本号
  cd "$ROOT_DIR" && pnpm version $NEW_VERSION --no-git-tag-version
  
  # 更新 web 应用版本号
  cd "$ROOT_DIR/apps/web" && pnpm version $NEW_VERSION --no-git-tag-version && cd ../..
  
  # 更新 core 包版本号
  cd "$ROOT_DIR/packages/core" && pnpm version $NEW_VERSION --no-git-tag-version && cd ../..
  
  # 提交版本更新
  git config --local user.email "action@github.com"
  git config --local user.name "GitHub Action"
  git add .
  git commit -m "chore: bump version to $NEW_VERSION"
  
  # 创建 tag
  git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"
  
  # 推送更改和 tag
  git push origin master
  git push origin "v$NEW_VERSION"
  
  echo "✨ 版本已更新到 $NEW_VERSION 并创建了 tag"
fi 