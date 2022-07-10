---
title: 极短「CSS3」代码去 CSDN 广告
author: 赤琦
date: 2018-08-13T16:39:45+08:00
description:
original:
tags:
  - CSS
  - 广告
categories:
  - develop
---

## 关于 CSDN

不得不说 CSDN 博客页上聚集了大量的知识内容，可是深恶痛绝的是满屏的广告让你不能专注于博客内容，多的不说，一张图告诉你它的广告有多少

![](/img/CSDN.jpg)

一个连搜索引擎检索的 SEO 关键都是广告词！吃惊！！！

[知乎关于 CSDN 的讨伐](https://www.zhihu.com/question/52061495 'https://www.zhihu.com/question/52061495')

## 针对博客详情页

其实有不少的替代方案：掘金，segmentfault 等都是高质量的，可是一些比较偏的内容确实能在 CSDN 中快速检索得到，特别是经常百度一下全是 CSDN 的链接（：汗颜-，所以是免不了看它了，来吧，动手去广告

### 原理

利用插件在加载完毕的页面中加入定制样式以及脚本内容

在 Chrome 商店检索到了[stylish](https://github.com/stylish-userstyles/stylish/)和[stylus](https://github.com/openstyles/stylus)用于 Custom CSS 的神器（油猴脚本也可以哦，转为 JavaScript 就好了）

当然不仅仅用于 Chrome，上述插件在 FireFox、Opera、Safari、Edge 以及其他 WebKit 浏览器均有不同程度的支持，总之就是很方便了。P.S.:手机端也有，安卓 Yandex 等，不过我的代码适用于 PC 端，自行移植和修改定制

### 解决和实现

[https://userstyles.org](https://userstyles.org 'https://userstyles.org')里面有非常多已经定制好的代码，可是我都不满意，他们均不能很好的除去广告，于是我就打算自己写

一般的隐藏 HTML 元素大家想到的选择都是比较常见的，通过标签、样式等选中后隐藏。可是这样做的代价很大：一个网页内的元素太多造成选取困难，甚至还有动态改变的内容

于是我就想能不能换个思路：既然我不能知道每个广告的位置，那么我就把除了文章的主要内容外的元素都隐藏，但是很快我就遇到了难题，CSS 好像没这样的选择器？

于是打开 CSS 选择器文档发现了 `:not()` 选择器，也就是除了的意思。

```css
div: not(p); // div下面的非p的所有标签
```

可是使用中发现要除去多个，习惯测试用逗号分隔无效（也就是有顺序，前面的隐藏了就选不到了）于是又疯狂的百度

嘿嘿，原来 `:not()` 函数是可以并列的，可以说 CSS3 真的是好用，期待下下一代会有更优秀的选择器

```css
div:not(p):not(a)   // div下面的除了p和a以外的所有标签
```

有了这个就好办了

仅保留文章主要文字和相关文章，其他可自行扩展

```css
// 首先去除所有文章页以外的内容
body {
  background: url() #f2f2f2 !important;
}

body > :not(#mainBox) {
  display: none !important;
}
// 再将文章内文字部分保留（相当于去aside标签）
#mainBox > :not(main) {
  display: none !important;
}
// 去除评论以及部分广告
main > :not(.blog-content-box):not(.recommend-box):not(.hide-article-box) {
  display: none !important;
}
// 去除相关文章内的广告
.recommend-box > :not(.type_blog) {
  display: none !important;
}
// 对文章居中显示
main {
  position: absolute;
  top: 3em;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
// p 颜色控制
p {
  color: #000 !important;
}
```

效果图

![](/img/CSDN-1.jpg)

## 不止于 CSDN 和去广告

现在你完全可以使用 CSS 和 JavaScript 定制任何网站的样式，无广告百度，任何主题的 bilibili，享你所想！

扩展阅读：[CSS3 选择器](http://www.w3school.com.cn/cssref/css_selectors.asp)
