---
author: 赤琦
date: 2019-09-03T06:03:36+08:00
description:
original:
tags:
  - Git
  - Git LFS
title: 从仓库取消使用「Git LFS」跟踪大型媒体文件
categories:
  - develop
---

### Git Large File Storage

Git Large File Storage (LFS) 是一种能够将 Repository 中的各种非代码格式文件转化为指针跟踪存储的方式。它能有效的减少每次 pull 和 push 的 size，同时也减少了仓库的资源占用。具体介绍详见[GitHub 的官网指南](https://git-lfs.github.com/)。

### Remove Git LFS

由于静态网站自动化部署和 GitHub API 自身的原因不能托管使用了**Git LFS**的 Repository。一番 Google 后没有获得有用的操作步骤。此后无意间操作成功 remove 了这个高级操作……

1. 先对你的 Repository 执行 `git lfs pull` 或者 `git lfs fetch`，确保本地的指针文件替换成你的文件

2. 删除目录下所有 **.gitattributes** 跟踪文件

3. **关键**：执行 `git rm --cached *`，其中 --cached 属性必不可少，该命令会刷新所有 Git 记录的文件缓存

4. 这时你会发现你刷新了整个 Git 记录，提示需要 add 所有的 change，不要惊慌，此时直接`git add .`并 commit 记录就可以了，到这里就已经移除了 Git LFS
