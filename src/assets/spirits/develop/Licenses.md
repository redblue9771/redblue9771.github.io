---
title: 如何选择「Open License」？
author: 赤琦
date: 2018-11-26 00:00:00 +0000
description: 一份开源协议指北
draft: true
original:
categories:
  - develop
---

## 何谓「开源」

开源「Open Source」是指开发者将其开发产品的源代码或者源设计公布给大众阅读、使用（甚至包括商业使用）的一种做法。与之对应的是**闭源「CLosed Source」**。对于软件的开源一般指可以对软件进行二次开发，并且在遵循一定协议的原则上可以进行发行使用。开源最典型的例子就是**Linux**系统，一个内核衍生出众多发行版，广泛服务于计算界。互联网之所以能有今天的发展一定离不开开源软件的流行，因为它推动着技术的创新、发展。

## 何谓「开源协议」

随着开源方式的流行，开源体的版权成了最大的问题。于是衍生出跟**著作权「Copyright」**类似的**著佐权「Copyleft」**。著佐权常常使用**开源协议「Open License」**进行授权。

> 开放源代码的定义由 Bruce Perens「Debian 的创始人之一」定义如下：[^open]

> - **自由再散布「Free Distribution」**：允许获得源代码的人可自由再将此源代码散布。

> - **源代码「Source Code」**：程序的可执行档在散布时，必需以随附完整源代码或是可让人方便的事后获取源代码。

> - **派生著作「Derived Works」**：让人可依此源代码修改后，在依照同一许可协议的情形下再散布。

> - **原创作者程序源代码的完整性「Integrity of The Author’s Source Code」**：意即修改后的版本，需以不同的版本号码以与原始的代码做分别，保障原始的代码完整性。

> - **不得对任何人或团体有差别待遇「No Discrimination Against Persons or Groups」**：开放源代码软件不得因性别、团体、国家、族群等设置限制，但若是因为法律规定的情形则为例外「如：美国政府限制高加密软件的出口」。

> - **对程序在任何领域内的利用不得有差别待遇「No Discrimination Against Fields of Endeavor」**：意即不得限制商业使用。

> - **散布许可协议「Distribution of License」**：若软件再散布，必需以同一条款散布之。

> - **许可协议不得专属于特定产品「License Must Not Be Specific to a Product」**：若多个程序组合成一套软件，则当某一开放源代码的程序单独散布时，也必需要匹配开放源代码的条件。

> - **许可协议不得限制其他软件「License Must Not Restrict Other Software」**：当某一开放源代码软件与其他非开放源代码软件一起散布时「例如放在同一光盘」，不得限制其他软件的许可条件也要遵照开放源代码的许可。

> - **许可协议必须技术中立「License Must Be Technology-Neutral」**：意即许可协议不得限制为电子格式才有效，若是纸本的许可协议也应视为有效。

目前世界上的开源协议有几百种，最流行、最广泛使用的有：[^license]

- Apache License 2.0 (Apache-2.0)
- 3-clause BSD license (BSD-3-Clause)
- 2-clause BSD license (BSD-2-Clause)
- GNU General Public License (GPL)
- GNU Lesser General Public License (LGPL)
- MIT license (MIT)
- Mozilla Public License 2.0 (MPL-2.0)
- Common Development and Distribution License version 1.0 (CDDL-1.0)
- Eclipse Public License version 2.0

### 怎么选择开源协议

由于开源协议众多，且内容复杂，作为个人开发者可以简单的根据 [Choose an open source license](https://choosealicense.com/) 的指引来选择。

如果要认真一些或是为作为团队公司考虑，可以参考这样的图：

<div class="mermaid">
graph TD
A[新的使用允许闭源] --> B{所修改的文件是否<br>要放有版权说明}
B -->|必须| C[Apache 许可证]
B -->|不必| D{衍生发行时是否<br>可以使用原开源<br>作者/组织/产品<br>的名称进行推广}
D -->|可以| E[MIT 许可证]
D -->|不可以| F[BSD 许可证]
</div>

<div class="mermaid">
graph TD
A[新的使用不允许闭源] --> B{所修改的文件是否<br/>要使用原协议}
B -->|必须| C[GPL 许可证]
B -->|不必| D{新的修改是否需要<br/>做出文档说明}
D -->|必须| E[MPL 协议]
D -->|不必| F[LGPL 协议]
</div>

###### 参考

[^open]: https://zh.wikipedia.org/wiki/%E5%BC%80%E6%BA%90%E8%BD%AF%E4%BB%B6
[^license]: https://opensource.org/licenses/categories
