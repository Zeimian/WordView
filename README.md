# WordView

An immersive English learning web platform that turns any video into interactive vocabulary lessons. Import videos (file or URL) → auto-extract subtitles → generate leveled vocabulary → learn words in context with split-screen video + vocabulary panel, click-to-pronounce, and AI-powered conversation practice. Built with Next.js 16, Prisma ORM, and designed for a free-to-paid SaaS model targeting Chinese English learners.

---

## 要解决的问题

- **传统背单词脱离语境** — 记住意思但不会用，不知道在真实场景中怎么说
- **看视频学英语效率低** — 没有工具辅助，遇到生词要暂停查词，打断沉浸感
- **发音练习缺乏即时反馈** — 不知道自己读得对不对

WordView 的核心理念：**视频即教材，点词即学，AI 即老师**。

---

## 核心功能

### Phase 1: MVP

| 功能 | 说明 |
|------|------|
| 视频导入 | 拖入文件 (MP4/MKV) 或粘贴 YouTube/B站链接 |
| 字幕提取 | 自动解析 SRT/VTT 字幕，时间轴对齐 |
| 词汇生成 | 分词 + 词频 + CEFR 难度分级 + 释义音标 |
| 分屏学习 | 左视频 + 右词汇面板，实时字幕同步 |
| 点词发音 | 点击单词 → 暂停视频 → 播放美式发音 |
| 生词本 | 收藏单词，卡片式复习 |
| 微信登录 | NextAuth.js + 微信 OAuth + 手机号验证 |

### Phase 2: AI 增强

| 功能 | 说明 |
|------|------|
| 智能分级 | AI 评估用户水平，推荐合适难度内容 |
| AI 口语 | 基于当前词汇的场景对话练习 |
| 智能复习 | Spaced Repetition + AI 出题 |
| 发音评估 | 用户跟读，AI 评分 |
| 学习报告 | 周/月学习数据可视化 |

---

## 技术架构

```
┌──────────────────────────────────────────────┐
│              WordView (Next.js 16)            │
├────────────────┬─────────────────────────────┤
│   Frontend     │   Backend (API Routes)      │
│   React 19     │   Prisma ORM                │
│   Tailwind 4   │   NextAuth.js v5            │
│   shadcn/ui    │   AI (阿里百炼)             │
│   Zustand      │   SQLite → PostgreSQL       │
└────────────────┴─────────────────────────────┘
```

**技术栈**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui + Prisma ORM + SQLite (Demo) / PostgreSQL (上线)

**关键设计决策**:
- 用 Prisma ORM 抽象数据库层，SQLite → PostgreSQL 只需改连接字符串
- Demo 阶段用 Vercel 部署，上线迁移阿里云
- 发音使用 Web Speech API（免费），可选 Azure TTS

---

## 界面设计

```
┌──────────────────────────────────────────────────────┐
│  [Logo]  学习  词库  复习  测验        [VIP] [头像]  │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │                  │  │  Friends S1E01            │  │
│  │  Video Player    │  │  apartment     公寓       │  │
│  │                  │  │  relationship  关系       │  │
│  │  [▶] ────○────  │  │  absolutely    绝对地     │  │
│  └──────────────────┘  └──────────────────────────┘  │
│  当前字幕:                                           │
│  "I'm not great at relationships."                   │
└──────────────────────────────────────────────────────┘
```

**设计原则**: 深色/浅色跟随系统、清爽简约、视频区为主、移动端自适应

---

## 项目结构

```
WordView/
├── prisma/schema.prisma        # 数据库 Schema
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # 认证相关页面
│   │   ├── (dashboard)/        # 仪表板页面
│   │   │   ├── import/         # 视频导入
│   │   │   ├── study/[id]/     # 分屏学习
│   │   │   ├── vocabulary/     # 生词本
│   │   │   └── review/         # 复习
│   │   └── page.tsx            # 落地页
│   ├── components/             # UI 组件
│   ├── lib/                    # 工具函数
│   └── store/                  # 状态管理
├── PRD.md                      # 产品需求文档
├── spec.md                     # 技术规范文档
└── README.md
```

---

## 开发

```bash
# 安装依赖
npm install

# 初始化数据库
npx prisma generate
npx prisma db push

# 启动开发服务器
npm run dev
```

---

## 商业模式

| 功能 | 免费 | VIP |
|------|------|-----|
| 视频导入 | 每日 1 个 | 无限 |
| 词汇学习 | 每日 20 词 | 无限 |
| AI 对话 | 每日 5 轮 | 无限 |
| 生词本 | 200 词上限 | 无限 |
| AI 功能 | - | 全部开放 |

---

## Project Status

| 模块 | 状态 |
|------|------|
| 项目初始化 | 规划中 |
| 视频导入 | 规划中 |
| 字幕提取 | 规划中 |
| 分屏学习 | 规划中 |
| 用户系统 | 规划中 |
| AI 功能 | 规划中 |

**最后更新**: 2026-05-22
