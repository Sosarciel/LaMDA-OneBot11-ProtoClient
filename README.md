# OneBot11-ProtoClient

OneBot11 协议客户端实现，用于连接 OneBot 标准的机器人平台。

---

## 📋 实施计划

- [[plan/README|查看所有计划]]

---

## 功能概述

- **事件监听**：支持消息、通知、请求等事件类型
- **消息发送**：OneBotSender 提供消息发送能力
- **CQCode 解析**：支持 CQCode 格式的消息编解码
- **REST API**：封装 OneBot HTTP API 接口

## 目录结构

```
src/
├── OneBotListener.ts  # 事件监听器
├── OneBotSender.ts    # 消息发送器
├── RESTApi.ts         # REST API 封装
├── CQCode.ts          # CQCode 编解码
└── Event/             # 事件类型定义
```

---

*最后更新: 2026-03-25*
