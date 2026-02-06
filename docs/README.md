# figma-use 技术文档

> 深入理解 figma-use 的工作原理、技术架构和使用场景

## 📚 文档目录

| 文档 | 描述 |
|------|------|
| [核心架构](./01-architecture.md) | 整体架构设计、CDP通信原理、技术栈概览 |
| [Figma API 集成](./02-figma-api-integration.md) | 如何使用 Figma Plugin API、RPC 机制详解 |
| [Design System 绑定](./03-design-system-binding.md) | 与现有设计系统集成、Variables 和 Tokens 的使用 |
| [JSX 渲染系统](./04-jsx-rendering.md) | JSX 语法、组件定义、样式 shorthands |
| [风险与兼容性分析](./05-risks-and-compatibility.md) | 官方支持情况、封禁风险、升级兼容性 |
| [AI Vibe Design 愿景](./06-ai-vibe-design.md) | 设计师如何利用 AI 进行 vibe coding |

## 🎯 快速理解

figma-use 是一个通过 **Chrome DevTools Protocol (CDP)** 直接控制 Figma 桌面应用的 CLI 工具。它让你可以：

```
┌─────────────┐            ┌─────────────┐
│   Terminal  │────CDP────▶│   Figma     │
│  figma-use  │  port 9222 │             │
└─────────────┘            └─────────────┘
```

1. **命令行创建** - 用简单的 CLI 命令创建 Frame、Text、Icon 等
2. **JSX 渲染** - 用 React 风格的 JSX 描述界面，自动渲染到 Figma
3. **Design System 集成** - 绑定 Figma Variables，使用现有的设计 tokens
4. **AI 友好** - 专为 LLM 设计，支持 MCP 协议

## 🔑 核心特点

### 不需要安装 Figma 插件

figma-use 直接通过 CDP 注入代码到 Figma 的 JavaScript 运行时，无需任何插件安装。

### LLM 原生设计

CLI 命令简洁、JSX 语法是 LLM 熟悉的格式，token 效率高。

### 双向操作

不仅可以创建，还可以读取、分析、导出 Figma 设计。

## 📖 开始阅读

建议按顺序阅读文档，从 [核心架构](./01-architecture.md) 开始。
