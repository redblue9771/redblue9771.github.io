---
author: 赤琦
date: 2018-11-13
description: 包括怎么在 Windows 中使用 Linux、怎么设置 WSL/Bash/Linux shell 为 VScode 的默认终端、Code Runner 使用 WSL/Bash/Linux shell
original:
tags:
  - 开发环境
  - Linux
  - WSL
title: 「WSL」Windows 下的 Linux 开发环境
category:
  - develop
---

# Windows 下的 Linux 开发神器

## 💁🏻‍ 为什么要使用 Linux

**开源！**

开源 = 自由，于是世界上有 N 多个衍生版，种类丰富，可定制性强，直接操作内核。相比于 Windows、MacOs 闭源操作系统安全性较高。

你可能跟以前的我一样，对 Linux 的认识就是黑乎乎的 Terminal 界面。其实现在的 Linux 由于开源具有超强的个性化，桌面版已经甩了 Windows 很远了，尽管如今的 Fluent Design 提高了微软的审美，但是 win10 中文字体在一些高 DPI 上还是硬伤。

不知道你有没有这种经历：Windows 经常要**重装**，特别是喜欢折腾的人。每次重装一大堆配置需要安装。Linux 就容易了吗？当然，你只要一条**命令**就能安装大部分的开发环境，不需要复杂的配置。对于 Web 开发，或者是嵌入式等开发，Linux 的环境都是首选。

## What is the WSL ?

**适用于 Linux 的 Windows 子系统「英语：Windows Subsystem for Linux，简称 WSL」** 是一个为在 Windows 10 上能够原生运行 Linux 二进制可执行文件（ELF 格式）的兼容层。它是由微软与 Canonical 公司合作开发，目标是使纯正的 Ubuntu 14.04/18.04, OpenSUSE, Kali Linux 和 Debian 映像能下载和解压到用户的本地计算机，并且映像内的工具和实用工具能在此子系统上原生运行。

WSL 提供了一个微软开发的 Linux 兼容内核接口（不包含 Linux 代码），来自 Ubuntu 的用户模式二进制文件在其上运行。

该子系统不能运行所有 Linux 软件，例如那些图形用户界面，以及那些需要未实现的 Linux 内核服务的软件。 不过，这可以用在外部 X 服务器上运行的图形 X 窗口系统缓解。

_Tip：适用于 Windows 1607 (build 14316)及其以上版本，需要开启开发者模式，并且最好是专业版以上版本，具体支持情况请 Google_

## 🕵🏻 简单两步开启 WSL

#### 一、启用 适用于 Linux 的 Windows 子系统

1. 控制面板

2. 程序和卸载

3. 启用或关闭 windows 功能

   [![](/img/wsl0.jpg)](/img/wsl0.jpg)

4. 找不到的话尝试开启开发者模式

   windows 设置 -> 更新与安全 -> 开发者模式

   [![](/img/wsl7.png)](/img/wsl7.png)

5. 重启系统

#### 二、安装你喜欢的发行版

1. 打开 Microsoft Store

2. 搜索 wsl

3. 安装你喜欢的任意发行版

   _Windows 目前只提供 Debian 系的发行版，当然 SUSE 也很香_

   [![](/img/wsl1.jpg)](/img/wsl1.jpg)

   🔥 推荐使用轻量、安全、快速、对 Web 开发友好的 Alpine Linux [https://github.com/agowa338/WSL-DistroLauncher-Alpine](https://github.com/agowa338/WSL-DistroLauncher-Alpine)

4. 打开你的 Linux 会出现 installing ……

   _安装失败可以重新打开，或者卸载重新安装，再或者重新开启一下 [启用 适用于 Linux 的 Windows 子系统](#启用-适用于-linux-的-windows-子系统)_

5. 输入用户名、密码即可开启你的 Linux 之旅

## 💪🏻 WSL 使用、管理、在 VScode 中使用

#### 快速访问

- 快速启动 bash

  CMD 或者 PowerShell 中直接输入 bash 或者 wsl 回车

  [![](/img/wsl2.png)](/img/wsl2.png)

- 运行 bash

  win + R 输入 bash 或者 wsl 回车

  [![](/img/wsl3.png)](/img/wsl3.png)

- 在目录中快速打开

  在目录下`shift + 鼠标右键`即可快速调出`在此处打开 Linux Shell`

  _仅支持 Windows 1803 及以上_

  [![](/img/wsl6.png)](/img/wsl6.png)

#### WSL 的路径、与 win 的关系

WSL 的根目录 `%localappdata%\Packages\` + 含分发名的文件夹名 `+\LocalState\rootfs`。分发名字可通过搜索你的分发版名称找到。找到路径后可以对目录右键固定到快速访问以便使用。

[![](/img/wsl4.jpg)](/img/wsl4.jpg)

WSL 是与 Windows 共享磁盘、环境 PATH 的，在 wsl 中输入`export`

[![export 之后](/img/wsl5.png)](/img/wsl5.png)

注意路径是挂载在 wsl 的 mnt 文件中，所有盘符都要替换。例如`D:/test => /mnt/d/test`。并且 wsl 中是可以直接打开 exe 的（实质是 Windows 打开的），但是 Windows 不能直接打开不带后缀名的二进制文件。PATH 虽然共享，要直接使用也是不行的。比如我在 WSL 装了 GCC，Win 的 IDE 在配置环境的时候就不能使用它，只能通过终端手动命令。

#### 多分发版配置

你可能在应用商店装了多个 WSL，系统可以指派一个默认分发版

1. 打开 CMD or PowerShell

2. 输入 `wslconfig` 回车即可调出并管理 Windows 上所有的 Linux 分发

   ```
   Windows PowerShell
   版权所有 (C) Microsoft Corporation。保留所有权利。

   PS C:\Windows\system32> wslconfig
   对 Windows 上的 Linux 子系统进行操作管理

   用途：
       /l, /list [/all]
           列出已注册的分发版。
           /all - 有选择地列出所有分发版，包括
               当前正在安装或卸载的分发版。

       /s, /setdefault <DistributionName>
           将该分发版设为默认。

       /t, /terminate <DistributionName>
           终止分发。

       /u, /unregister <DistributionName>
           取消分发版注册。

       /upgrade <DistributionName>
           将分发版升级至 WslFs 文件系统格式。
   PS C:\Windows\system32>
   ```

#### VSCode 配置

VSCode 可以直接配置成 WSL 的终端

在 setting.json 中修改条目（或者直接加入）

```json
"terminal.integrated.shell.windows": "C://Windows//System32//cmd.exe",
"terminal.external.windowsExec": "C://Windows//System32//cmd.exe",

// 改为

"terminal.integrated.shell.windows": "C://Windows//System32//wsl.exe",
"terminal.external.windowsExec": "C://Windows//System32//wsl.exe",
```

对于使用 Code Runner 插件的需要加入条目

```json
"code-runner.terminalRoot": "/mnt/",
```
