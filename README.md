# RedBlue | 赤琦

个人网站，使用 Astro 静态生成、React/TypeScript 交互组件和 Tailwind CSS 构建。

## 项目结构

- `src/`：Astro 主题源代码。
  - `pages/`、`layouts/`、`components/`：路由页面、站点布局、Astro/React 组件。
  - `styles/`：全局样式和主题 tokens。
  - `articles.ts`：文章排序、摘要等共享逻辑。
  - `content.config.ts`：定义并校验内容集合。
- `config/`：主题站点配置和第三方集成配置。
- `content/`：当前站点的内容。
  - `articles/`：Markdown 文章。
  - `data/`：导航页面、轮播、藏书等 YAML 数据。
- `public/`：静态资源；例如 `public/img/example.png` 对应站点路径 `/img/example.png`。
- `astro.config.ts`、`.env.example`：Astro 构建和部署环境配置。

## 快速定制

从 `config/site.ts` 修改品牌、个人资料和站点默认信息；从 `config/integrations.ts` 查看第三方集成环境变量的读取和开关规则。

- `site`：网站名称、正式网址、默认 SEO 描述和语言。
- `brand`：品牌名称、Logo、图标、字体、版权信息及页脚文案。
- `profile`：首页问候语、头像、背景、个人简介、最新文章数量和编码统计。
- `social`：GitHub 用户名和页脚外链。
- `pages`、`article`：404 提示和文章许可协议。

其他配置位置：

- `content/data/publicPage.yaml`：导航项目、各页面标题/副标题及页面 SEO 描述。
- `content/data/carousel.yaml`、`book.yaml`：首页轮播和藏书内容。
- `src/styles/theme.css`：品牌主色、辅助色、字体 tokens 和深色模式样式。
- `public/`：替换 Logo、字体、头像、背景等静态文件时使用，引用路径以 `/` 开头。

### 环境变量

Astro 通过 `import.meta.env` 读取环境变量。用于客户端或静态生成输出的变量统一使用 `PUBLIC_` 前缀；这些值会进入生成的网站，**不要放密钥或令牌**。将 `.env.example` 复制为 `.env.local` 后按需修改。Google Analytics ID 留空时不加载；其他集成变量使用示例值或 `config/` 中的默认设置：

| 变量                                   | 用途                                                               |
| -------------------------------------- | ------------------------------------------------------------------ |
| `PUBLIC_GITHUB_USERNAME`               | GitHub 用户名                                                      |
| `PUBLIC_GOOGLE_ANALYTICS_ID`           | Google Analytics 测量 ID；留空时不加载                             |
| `PUBLIC_VERCEL_ANALYTICS_ENABLED`      | 是否启用 Vercel Analytics，`true` / `false`                        |
| `PUBLIC_VERCEL_SPEED_INSIGHTS_ENABLED` | 是否启用 Vercel Speed Insights，`true` / `false`                   |
| `PUBLIC_UTTERANCES_REPOSITORY`         | Utterances 评论仓库，格式为 `owner/repository`；留空可关闭文章评论 |
| `PUBLIC_UTTERANCES_ISSUE_TERM`         | Utterances issue 匹配方式                                          |
| `PUBLIC_UTTERANCES_LABEL`              | Utterances issue 标签                                              |

同名部署环境变量可在托管平台中设置。Astro 配置只读取表中列出的 `PUBLIC_` 变量。不要为纯静态前端配置非公开变量并期待它们能安全地进入浏览器；需要私密凭据时应放在服务端函数或 CI 部署步骤中。

## 环境要求

- Node.js `>=22.23.4`
- npm

## 本地开发

```sh
npm install
npm run dev
```

Astro 开发服务器默认运行在 <http://localhost:4321>。

## 检查与构建

```sh
npm run check
npm run build
npm run preview
```

静态站点默认输出到 `dist/`。`npm run gh` 会构建并使用 `gh-pages` 发布该目录。

需要启用 Google Analytics 时，设置 `PUBLIC_GOOGLE_ANALYTICS_ID`。

## 内容路由

- `/`：主页
- `/articles`：博文列表
- `/articles/<markdown 文件名>`：文章详情
- `/library`：藏经
- `/repositories`：GitHub 项目和 Gist
- `/index.xml`：RSS

文章 URL 根据 Markdown 文件名的小写形式生成；草稿 (`draft: true`) 不进入公开列表、页面或 RSS。Astro 内容集合会在构建时校验文章 frontmatter 和 YAML 数据。
