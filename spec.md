# WordView — 技术规范文档 (Spec)

> 版本：v1.0
> 日期：2026-05-22
> 状态：规划阶段

---

## 一、技术架构

### 1.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                      WordView (Web App)                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐    ┌───────────────────────────┐  │
│  │   Frontend       │    │   Backend (API Routes)    │  │
│  │   Next.js 16     │◄──►│   Next.js Serverless      │  │
│  │   React 19       │    │   Prisma ORM              │  │
│  │   Tailwind CSS 4 │    │   NextAuth.js v5          │  │
│  │   shadcn/ui      │    │   AI Service (百炼)       │  │
│  │   Zustand        │    │                           │  │
│  └──────────────────┘    └───────────┬───────────────┘  │
│                                      │                  │
│                   ┌──────────────────┼───────────────┐  │
│                   │                  │               │  │
│              ┌────▼────┐    ┌───────▼──────┐  ┌────▼───┐ │
│              │ SQLite  │    │ File Storage │  │ Cache  │ │
│              │ (Demo)  │    │ (Vercel Blob │  │ (KV)   │ │
│              │         │    │  / Local)    │  │        │ │
│              └─────────┘    └──────────────┘  └────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 1.2 数据流

```
用户导入视频
    │
    ▼
视频文件上传 / URL 解析
    │
    ▼
字幕提取 (SRT/VTT 解析)
    │
    ▼
分词 + 词频统计 + 难度分级
    │
    ▼
词汇卡片生成 (释义/音标/例句)
    │
    ▼
分屏学习界面渲染
    │
    ▼
用户点击单词 → 视频暂停 → 发音播放
    │
    ▼
收藏 → 生词本 → 复习
```

---

## 二、技术栈

### 2.1 前端

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16 (App Router) | 框架 + 路由 + SSR |
| React | 19 | UI 组件 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4 | 样式系统 |
| shadcn/ui | latest | 组件库 |
| Zustand | 5.x | 状态管理 |
| lucide-react | latest | 图标 |

### 2.2 后端

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js API Routes | 内置 | 服务端 API |
| Prisma ORM | 6.x | 数据库抽象 |
| SQLite | 内置 | Demo 数据库 |
| NextAuth.js | v5 | 认证 |

### 2.3 第三方服务

| 服务 | 用途 | 替代方案 |
|------|------|---------|
| 阿里百炼 | AI 对话/分级 | OpenAI API |
| Web Speech API | 发音播放 | Azure TTS |
| YouTube Data API | 视频信息获取 | - |
| B站 API | 视频/字幕获取 | - |
| Vercel | 部署 | 阿里云 (上线) |

### 2.4 数据库

| 阶段 | 数据库 | 连接方式 |
|------|--------|---------|
| Demo | SQLite (file) | `file:./data/dev.db` |
| 上线 | PostgreSQL (Supabase) | `postgresql://...` |
| 阿里云 | RDS PostgreSQL | `postgresql://...` |

**迁移策略**: Prisma ORM 抽象数据库层，SQLite → PostgreSQL 只需改 `DATABASE_URL`。

---

## 三、数据库 Schema

### 3.1 users

```sql
id           TEXT PRIMARY KEY (UUID)
name         TEXT
avatar       TEXT (URL)
phone        TEXT
vip_level    INTEGER DEFAULT 0
daily_usage  INTEGER DEFAULT 0
created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
```

### 3.2 videos

```sql
id            TEXT PRIMARY KEY (UUID)
user_id       TEXT REFERENCES users(id)
title         TEXT
url           TEXT
file_path     TEXT
duration      INTEGER (秒)
subtitle_text TEXT
language      TEXT DEFAULT 'en'
created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
```

### 3.3 vocabulary

```sql
id                TEXT PRIMARY KEY (UUID)
video_id          TEXT REFERENCES videos(id)
word              TEXT
definition        TEXT
phonetic          TEXT
difficulty        TEXT (A1-C2)
frequency         INTEGER
context_sentence  TEXT
timestamp_in_video INTEGER (毫秒)
created_at        DATETIME DEFAULT CURRENT_TIMESTAMP
```

### 3.4 user_words

```sql
id              TEXT PRIMARY KEY (UUID)
user_id         TEXT REFERENCES users(id)
word_id         TEXT REFERENCES vocabulary(id)
mastery_level   INTEGER DEFAULT 0 (0-5)
last_reviewed   DATETIME
next_review     DATETIME
times_reviewed  INTEGER DEFAULT 0
created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
```

### 3.5 study_sessions

```sql
id          TEXT PRIMARY KEY (UUID)
user_id     TEXT REFERENCES users(id)
type        TEXT (browse/quiz/speaking)
words_count INTEGER
duration    INTEGER (秒)
score       REAL
created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
```

---

## 四、项目结构

```
WordView/
├── prisma/
│   ├── schema.prisma          # 数据库 Schema
│   └── dev.db                 # SQLite 数据库 (Demo)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx   # 登录页面
│   │   │   └── api/auth/[...nextauth]/
│   │   │       └── route.ts   # NextAuth API
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx     # 仪表板布局
│   │   │   ├── page.tsx       # 首页/视频列表
│   │   │   ├── import/
│   │   │   │   └── page.tsx   # 视频导入页面
│   │   │   ├── study/[videoId]/
│   │   │   │   └── page.tsx   # 分屏学习页面
│   │   │   ├── vocabulary/
│   │   │   │   └── page.tsx   # 生词本页面
│   │   │   └── review/
│   │   │       └── page.tsx   # 复习页面
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 落地页
│   ├── components/
│   │   ├── video/
│   │   │   ├── VideoPlayer.tsx      # 视频播放器
│   │   │   ├── SubtitleSync.tsx     # 字幕同步组件
│   │   │   └── VideoImporter.tsx    # 视频导入组件
│   │   ├── vocabulary/
│   │   │   ├── WordCard.tsx         # 单词卡片
│   │   │   ├── WordPanel.tsx        # 词汇面板
│   │   │   └── FlashCard.tsx        # 翻转卡片
│   │   ├── ui/                      # shadcn/ui 组件
│   │   └── layout/
│   │       ├── Header.tsx           # 顶栏导航
│   │       └── Sidebar.tsx          # 侧边导航
│   ├── lib/
│   │   ├── db.ts                    # Prisma 客户端
│   │   ├── auth.ts                  # NextAuth 配置
│   │   ├── subtitle.ts              # 字幕解析
│   │   ├── vocabulary.ts            # 词汇提取
│   │   └── speech.ts                # 发音 (Web Speech API)
│   ├── store/
│   │   ├── useStudyStore.ts         # 学习状态
│   │   └── useUserStore.ts          # 用户状态
│   └── types/
│       └── index.ts                 # 全局类型定义
├── public/
│   └── ...                          # 静态资源
├── .env.local                       # 环境变量
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── PRD.md
├── spec.md
└── README.md
```

---

## 五、环境变量

| 变量 | 用途 | 示例 |
|------|------|------|
| DATABASE_URL | 数据库连接 | `file:./prisma/dev.db` |
| NEXTAUTH_SECRET | NextAuth 密钥 | 随机字符串 |
| NEXTAUTH_URL | NextAuth 回调地址 | `http://localhost:3000` |
| WECHAT_APP_ID | 微信 OAuth App ID | - |
| WECHAT_APP_SECRET | 微信 OAuth App Secret | - |
| DASHSCOPE_API_KEY | 阿里百炼 API Key | - |

---

## 六、开发规范

### 6.1 命名约定

| 类型 | 规则 | 示例 |
|------|------|------|
| 文件/目录 | kebab-case | `video-player.tsx` |
| 组件 | PascalCase | `VideoPlayer` |
| 函数/变量 | camelCase | `parseSubtitle` |
| 常量 | UPPER_SNAKE_CASE | `MAX_VIDEO_DURATION` |
| 类型/接口 | PascalCase | `VideoInfo` |

### 6.2 Git 提交规范

```
feat: 新增视频导入功能
fix: 修复字幕同步延迟问题
docs: 更新 PRD 文档
refactor: 重构词汇提取逻辑
```

### 6.3 组件开发规范

- 使用 TypeScript 严格模式
- 组件 props 必须有类型定义
- 每个组件独立文件，使用默认导出
- 样式使用 Tailwind 类名，不写内联 style
- 复杂逻辑抽离到 `lib/` 或自定义 hooks

---

## 七、部署

### 7.1 Demo 阶段

```bash
# 本地开发
npm run dev

# Vercel 部署
vercel --prod
```

### 7.2 上线阶段

- 数据库迁移: `prisma migrate deploy`
- 环境变量切换: SQLite → PostgreSQL
- 部署目标: 阿里云 / Vercel

---

*Spec 创建时间: 2026-05-22*
*状态: 规划阶段，待执行*
