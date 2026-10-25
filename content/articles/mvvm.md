---
author: 赤琦
date: 2018-05-03
description: 最近在学习开发微信小程序，其中用到了 MVVM 模式，与常见的 MVC 模式有所区别，简述其来备忘。
original:
tags:
  - MVVM
  - 小程序
  - 软件模型
title: 「小程序」简述 MVVM 模式
categories:
  - develop
---

## 什么是 MVVM？

MVVM 是 Model-View-ViewModel 的简写。它最早是由微软（Microsoft）为分离模型（Model）和视图（View）而提出来的 WPF 技术结合 MVP 模式演变而来。

## MVVM 的通信方向

以往 MVC 模式的操作方式是获取 DOM 对象，再对 DOM 对象进行变化。举个栗子：HTML 代码

```html
<p class="test">redblue</p>
```

我们采用 JQury 对它的内容操作为

```js
$(".test'").text('spirit.redblue.cf')
```

是的，我相信你非常容易理解。那么采用 MVVM 要怎样操作尼？同样对于刚刚的 HTML 源码

```html
<p class="test">{{obj.name}}</p>
//这里必须申明：假设{{数据名}}这样是获取数据内容并且定义有： // var obj = { //
name:"redblue" //} //那么，现在这句话就等同于
<p class="test">redblue</p>
```

对于修改这个我们很容易就这样做

```js
obj.name = 'spirit.redblue.cf'
```

这时候在没有获取 DOM 对象的情况下就对 View 视图重新渲染。这也就是 ViewModel 所起到的中间作用，即 Model 可以通过影响 ViewModel 来间接变化 View。这就是其最大的区别。当然，视图（View）可以独立于 Model 变化和修改，一个 ViewModel 可以绑定到不同的 View 上，当 View 变化的时候 Model 可以不变，当 Model 变化的时候 View 也可以不变，也就是低耦合性。
