---
author: 赤琦
date: 2024-12-08
tags:
  - Git
title: 快速隐藏 Git 仓库历史提交中的「隐私信息」
categories:
  - develop
---

在现代软件开发领域，Git 作为版本控制系统的核心工具，帮助开发者追踪代码变更、协作开发以及管理项目版本。然而，Git 仓库中可能不慎包含了敏感信息，例如密码、API 密钥、个人数据等。这些信息一旦泄露，可能会导致严重的安全问题。

随着数据泄露事件的日益增多，企业和个人越来越重视隐私信息的保护。Git 仓库中的隐私信息泄露不仅威胁到个人和企业的安全，还可能引发法律责任和声誉损失。因此，定期检查和处理 Git 仓库中的隐私信息变得至关重要。

每位开发人员都应该掌握有效的工具和方法来批量隐藏 Git 仓库中的隐私信息。本文将介绍如何使用 **BFG Repo-Cleaner** 工具来实现这一目标。

### 准备工作

在开始使用 BFG Repo-Cleaner 之前，需要进行一些准备工作：

1. **安装 BFG Repo-Cleaner**：

   - **在 macOS 上安装**：
     ```bash
     brew install bfg
     ```
   - **在 Ubuntu 上安装**：
     ```bash
     sudo apt-get install bfg-repo-cleaner
     ```
   - **在 Windows 上安装**：
     1. 安装 Java Runtime Environment。
     2. 确保计算机上已经安装了 git。
     3. 下载 BFG Repo-Cleaner 的 jar 文件。
     4. 运行 BFG Repo-Cleaner。

2. **备份仓库**：确保你有一个最新的非镜像仓库作为备份，这一步至关重要，以防止操作失误导致整个仓库被覆盖而无法恢复。

   ```bash
   git clone https://example.com/your-git-repo.git your-git-repo_backup
   ```

通过上述步骤，您可以确保在使用 BFG Repo-Cleaner 进行仓库清理时，既能高效地完成任务，又能保障数据的安全性和完整性。

### 使用 BFG 批量隐藏敏感信息

以下是使用 BFG Repo-Cleaner 隐藏所有含有特定邮箱地址 `your-username@email.com` 的内容的示例：

1. 创建一个包含邮箱地址的文件：创建一个文本文件（例如 `remove_email.txt`），并在其中写入需要隐藏的邮箱地址。BFG 支持正则表达式，你也可以使用正则表达式来匹配邮箱地址，但在这个案例中，直接写入邮箱地址即可。

   ```
   your-username@email.com
   ```

2. 运行 BFG：使用 `--replace-text` 参数和之前创建的包含邮箱地址的文件来替换仓库中的邮箱地址：

   ```bash
   bfg --strip-blobs-bigger-than 100M --replace-text remove_email.txt your-git-repo.git
   ```

3. 清理仓库：BFG 操作后，使用 `git reflog expire` 和 `git gc` 命令来清理不再需要的数据：

   ```bash
   cd your-git-repo.git
   git reflog expire --expire=now --all && git gc --prune=now --aggressive
   ```

4. 推送更改：最后，将清理后的仓库推送回远程服务器：

   ```bash
   git push -f
   ```

### 验证隐藏

回到你的仓库中查看预期需要替换的文件，你可以看到历史中文件内容都被替换成 `***REMOVED***`：

```html
<a href="mailto:***REMOVED***" target="_blank">E-mail</a>
```

### 恢复

如果需要恢复，请回到准备工作中第 2 步备份的原始仓库强制提交原始记录：

```bash
cd ../your-git-repo_backup
git push -f
```

### 进阶使用

其它高级操作详见 [BFG Repo-Cleaner 官方说明](https://rtyley.github.io/bfg-repo-cleaner/)。
