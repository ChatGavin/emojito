# Emojito

React Emoji 组件库，支持 Emoji 和 Unicode 码点，提供在线预览和搜索功能。

## 功能特性

- 🎯 React Emoji 组件, 兼容 Emoji 和 Unicode 码点
- 🎨 网站提供在线预览和 Emoji 搜索, 点击即可复制

## 安装

```bash
npm install emojito
```

## 使用

```jsx
import Emojito from "emojito";

function App() {
  return <Emojito code="1f600" size={48} />;
}
```

## API

### Emojito

| 属性 | 类型   | 默认值 | 说明                                                       |
| ---- | ------ | ------ | ---------------------------------------------------------- |
| code | string | -      | 支持直接输入表情符号或 Unicode 码点，例如：U+1F642 表示 🙂 |
| size | number | 24     | Emoji 的大小, 单位为 px, 范围: 12 - 48                     |

## 在线预览

访问 [emojito.gavin.chat](https://emojito.gavin.chat) 查看在线预览和搜索功能。

## 许可证

MIT
