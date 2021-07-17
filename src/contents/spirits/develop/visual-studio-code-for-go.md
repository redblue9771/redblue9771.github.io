---
author: 赤琦
date: 2019-04-12T19:58:31+08:00
original:
tags:
  - Golang
  - VS Code
  - 开发环境
title: Visual Studio Code 中的「Go配置」
category:
  - develop
---

## Visual Studio Code 提示错误

初次使用 VS Code 开发 Go 程序需要安装相关依赖工具，由于`go 1.11`开始启用了新的包管理机制造成了原来从 GitHub 获取包的形式不再适用，VS Code 输出报错：

```PowerShell
Installing 14 tools at C:\User\RedBlue\go\bin
gocode
gopkgs
go-outline
go-symbols
guru
gorename
gomodifytags
goplay
impl
godef
goreturns
golint
gotests
dlv

Installing github.com/nsf/gocode SUCCEEDED
Installing github.com/uudashr/gopkgs/cmd/gopkgs SUCCEEDED
Installing github.com/ramya-rao-a/go-outline FAILED
Installing github.com/acroca/go-symbols SUCCEEDED
Installing golang.org/x/tools/cmd/guru FAILED
Installing golang.org/x/tools/cmd/gorename FAILED
Installing github.com/fatih/gomodifytags SUCCEEDED
nstalling github.com/haya14busa/goplay/cmd/goplay SUCCEEDED
Installing github.com/josharian/impl FAILED
Installing github.com/rogpeppe/godef SUCCEEDED
Installing sourcegraph.com/sqs/goreturns FAILED
Installing github.com/golang/lint/golint FAILED
Installing github.com/cweill/gotests/... SUCCEEDED
Installing github.com/derekparker/delve/cmd/dlv SUCCEEDED

6 tools failed to install.
```

不过官网又提供了`GOPROXY`变量来方便代理，同时要启用`GO111MODULE`才可以生效。设置这两个变量即可通过代理获取 Google 代码库。

## 获取依赖

获取新的 16 个相关工具：

```bash
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/mdempsky/gocode
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/uudashr/gopkgs/cmd/gopkgs
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/ramya-rao-a/go-outline
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/acroca/go-symbols
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u golang.org/x/tools/cmd/guru
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u golang.org/x/tools/cmd/gorename
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/go-delve/delve/cmd/dlv
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/stamblerre/gocode
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/rogpeppe/godef
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/sqs/goreturns
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u golang.org/x/lint/golint
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/cweill/gotests/...
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/fatih/gomodifytags
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/josharian/impl
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/davidrjenni/reftools/cmd/fillstruct
GOPROXY='https://gocenter.io' GO111MODULE='on' go get -u github.com/haya14busa/goplay/cmd/goplay
```

## 安装依赖

```PowerShell
go install github.com/mdempsky/gocode
go install github.com/uudashr/gopkgs/cmd/gopkgs
go install github.com/ramya-rao-a/go-outline
go install github.com/acroca/go-symbols
go install golang.org/x/tools/cmd/guru
go install golang.org/x/tools/cmd/gorename
go install github.com/go-delve/delve/cmd/dlv
go install github.com/stamblerre/gocode
go install github.com/rogpeppe/godef
go install github.com/sqs/goreturns
go install golang.org/x/lint/golint
go install github.com/cweill/gotests/...
go install github.com/fatih/gomodifytags
go install github.com/josharian/impl
go install github.com/davidrjenni/reftools/cmd/fillstruct
go install github.com/haya14busa/goplay/cmd/goplay
```

执行完后重启 VS Code 即可。

![](/img/Gopher-ru.png)
