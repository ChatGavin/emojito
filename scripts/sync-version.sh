#!/bin/bash

# 获取根目录的版本号
ROOT_VERSION=$(node -p "require('./package.json').version")

# 更新所有 packages 目录下的 package.json
find ./packages -name "package.json" -type f -exec sh -c '
  echo "Updating version in {} to $ROOT_VERSION"
  node -e "
    const fs = require(\"fs\");
    const path = \"$1\";
    const pkg = JSON.parse(fs.readFileSync(path, \"utf8\"));
    pkg.version = \"$ROOT_VERSION\";
    fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + \"\n\");
  " "$1"
' sh {} \;

echo "✅ All package.json files have been updated to version $ROOT_VERSION" 