#!/bin/bash

# 获取当前目录
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 获取当前分支
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)

# 如果是 master 分支
if [ "$CURRENT_BRANCH" = "master" ]; then
  # 获取最新的远程 tag
  git fetch --tags
  LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "0.0.0")
  LATEST_VERSION=${LATEST_TAG#v}
  
  # 获取当前 package.json 中的版本号
  CURRENT_VERSION=$(node -p "require('$ROOT_DIR/package.json').version")
  
  # 比较版本号
  if [ "$CURRENT_VERSION" = "$LATEST_VERSION" ]; then
    echo "❌ 错误：当前版本号 $CURRENT_VERSION 与最新 tag 版本号 $LATEST_VERSION 相同"
    echo "请先运行 pnpm bump:auto 更新版本号"
    exit 1
  fi
fi

exit 0 