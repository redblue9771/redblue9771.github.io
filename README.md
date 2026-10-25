# RedBlue | 赤琦

个人网站，使用 Astro 静态生成、React/TypeScript 交互组件和 Tailwind CSS 构建。文章正文保存在 `src/assets/articles/`，页面、轮播和藏书等结构化数据保存在 `src/assets/general/`。

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

如需启用 Google Analytics，可设置 `PUBLIC_GOOGLE_ANALYTICS_ID`；旧的 `GATSBY_GOOGLE_ANALYTICS_ID` 环境变量仍可用于构建时兼容。

## 内容路由

- `/`：主页
- `/articles`：博文列表
- `/articles/<markdown 文件名>`：文章详情
- `/library`：藏经
- `/repositories`：GitHub 项目和 Gist
- `/index.xml`：RSS

文章 URL 根据 Markdown 文件名的小写形式生成；草稿 (`draft: true`) 不进入公开列表、页面或 RSS。Astro 内容集合会在构建时校验文章 frontmatter 和 YAML 数据。
