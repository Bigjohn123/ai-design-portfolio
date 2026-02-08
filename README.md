# AI Design Portfolio (AI 设计作品集)

这是一个使用 React 19, Vite 和 Supabase 构建的现代化、高性能作品集网站。本项目包含一个精致的前端展示页面和一个功能完善的后台管理系统。

## 🚀 功能特性

### 公开前端 (Public Frontend)
-   **作品展示**: 展示设计和 AI 项目，支持富媒体内容。
-   **博客系统**: 阅读技术与设计文章，支持 Markdown/HTML 内容渲染。
-   **动态配置**: 网站标题、描述和社交链接均可通过后台配置，无需重新部署。
-   **响应式设计**: 采用自定义 CSS 系统（类 Utility 风格），完美适配各种设备。

### 后台管理 (`/admin`)
-   **安全认证**: 使用 Supabase Auth (邮箱/密码) 保护所有管理路由。
-   **项目管理**: 创建、编辑和删除作品集项目（支持图片、描述、标签管理）。
-   **文章管理**: 完整的博客文章 CRUD 功能，支持设置封面图和富文本内容。
-   **站点配置**: 提供 JSON 编辑器，可直接修改全局站点设置（如标题、简单的文本内容），即时生效。
-   **视觉一致性**: 专用的后台主题 (`admin.css`)，提供清晰、专业的写作与管理环境。

## 🛠 技术栈

-   **前端框架**: React 19 + Vite
-   **语言**: TypeScript
-   **样式**: 自定义 CSS 架构 (基于 CSS 变量, 独立的 Admin 主题)
-   **后端 / 数据库**: Supabase (PostgreSQL + Auth + Storage)
-   **路由**: React Router v7+

## 📦 安装与设置

### 1. 克隆仓库
```bash
git clone https://github.com/your-username/ai-design-portfolio.git
cd ai-design-portfolio
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境变量配置
在根目录下创建一个 `.env.local` 文件：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
> **注意**: 本项目使用 `NEXT_PUBLIC_` 前缀约定，以保持与某些 React 框架的习惯兼容，尽管它运行在 Vite 上。

### 4. 数据库设置 (Supabase)
在你的 Supabase SQL 编辑器中运行所需的 SQL 命令。本项目包含 `supabase_schema.sql` 文件作为参考。

核心表结构:
-   `site_config` (存储全局设置)
-   `projects` (作品集项目)
-   `articles` (博客文章)

### 5. 本地运行
```bash
npm run dev
```
访问 `http://localhost:5173` 查看网站。

## 📖 使用指南

### 后台管理
1.  访问 `/admin`。
2.  使用管理员账号登录 (需在 Supabase Auth 中预先设置)。
3.  **Projects (项目)**: 添加新的设计或 AI 作品。
4.  **Articles (文章)**: 发布新的观点或教程。
5.  **Settings (设置)**: 编辑全局 `site_config` JSON，可即时修改网站标题、描述或其他全局变量。

### 自定义开发
-   **样式**: 全局样式位于 `index.css`。后台专用样式位于 `admin.css`。
-   **组件**: 可复用的 UI 组件位于 `src/components` 目录。

## 📄 许可证
MIT
