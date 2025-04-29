# Emojito

React Emoji 组件库，支持 Emoji 和 Unicode 码点，提供在线预览和搜索功能。

## 特性

- 🎯 React Emoji 组件, 兼容 Emoji 和 Unicode 码点
- 🎨 网站提供在线预览和 Emoji 搜索, 点击即可复制

## 安装

```bash
# 从 npm 安装
npm install emojito
```

## 使用

```jsx
import Emojito from "emojito";

function App() {
  return <Emojito code="1f600" size={48} />;
}
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发
pnpm web:dev

# 构建
pnpm web:build
pnpm core:build
```

## 调试

```jsx
import Emojito from "@emojito/core";

function App() {
  return <Emojito code="1f600" size={48} />;
}
```
