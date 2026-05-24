# WordView 工作日志

---

## 2026-05-22 — 项目初始化 & 文档搭建

### 完成事项

- [x] 确定项目名称: **WordView**
- [x] 创建项目目录: `/Users/apple/Documents/GitHub/WordView/`
- [x] 创建 `.gitignore` (Node.js + Next.js + 数据库排除)
- [x] 初始化 Git 仓库并提交
- [x] 创建 GitHub 仓库: https://github.com/Zeimian/WordView
- [x] 编写 `README.md` — 英文摘要 + 中文完整文档
- [x] 编写 `PRD.md` — 产品需求文档 (MVP + AI 增强两阶段)
- [x] 编写 `spec.md` — 技术规范文档 (架构、Schema、项目结构)
- [x] 保存项目记忆到 auto-memory 系统

### 待办事项

- [ ] 确认前端参考设计方案 → 选定后开始搭建
- [ ] 初始化 Next.js 16 项目 (npm create next-app)
- [ ] 配置 Tailwind CSS 4 + shadcn/ui
- [ ] 配置 Prisma ORM + SQLite
- [ ] 开发登录页面 + NextAuth.js v5
- [ ] 开发视频导入页面

### 技术决策记录

| 决策 | 选择 | 原因 |
|------|------|------|
| 框架 | Next.js 16 (App Router) | 用户熟悉，Vercel 原生支持 |
| ORM | Prisma | SQLite → PostgreSQL 无缝迁移 |
| UI 库 | shadcn/ui + Tailwind 4 | 轻量、可定制、跟随系统主题 |
| 状态管理 | Zustand | 简单高效，无样板代码 |
| 认证 | NextAuth.js v5 + 微信 OAuth | 国内用户习惯 |
| AI | 阿里百炼 | 用户已有接入 |
| 前端方案 | 先搭框架 + 参考设计 → 仿写 CSS | 效率优先，避免返工 |
