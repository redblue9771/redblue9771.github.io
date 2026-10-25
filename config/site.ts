const githubUsername = "redblue9771"

export const siteConfig = {
  site: {
    name: "RedBlue | 赤琦",
    url: "https://redblue.fun",
    description:
      "RedBlue(赤琦)，来自彩云之南的 95 后男孩，偏执的完美主义者，体现在方方面面。爱科技、爱搞机、爱摄影、爱一切美好的事物，追求源于热爱。",
    language: "zh-cmn-Hans",
  },
  brand: {
    name: "赤琦",
    logo: "/redblue.svg",
    logoAlt: "赤琦",
    openGraphImage: "/redblue-logo.svg",
    favicon: "/favicon.ico",
    fontStylesheet: "/fonts/redblue-embed.css",
    themeColor: "#0052d4",
    copyrightStartYear: 2017,
    slogan: "复兴中华 - 新中国、新时代、新青年 - 中华复兴",
    copyright: "保留所有权利。All Rights Reserved.",
    technologies: "JAMStack丨React.js丨Astro",
  },
  profile: {
    greeting: "I'm RedBlue.",
    greetingChinese: "你好，我是赤琦。",
    avatar: {
      src: "/img/gopher_head.png",
      alt: "Go 语言吉祥物",
    },
    backgroundImage: "/img/index-bg.jpeg",
    latestArticlesTitle: "· 博文 ·",
    latestArticleCount: 5,
    projectsTitle: "· 项目 ·",
    aboutTitle: "· 关于 ·",
    about: [
      "赤红 · 琦蓝",
      "Base in 滇南中心城市",
      "榕城：福建理工大学 · FJUTer",
      "Studying at freeCodeCamp",
      "偏执的完美主义者，追求源于热爱",
      "Make work. Make right. Make fast.",
    ],
    codingStats: {
      enabled: true,
      title: "· 编码统计 ·",
      embedUrl:
        "https://wakatime.com/share/@redblue/31eeb3ce-ba04-46d4-be43-9c09edf88c5c.svg",
      profileUrl: "https://wakatime.com/@redblue",
      fallbackText: "查看 WakaTime 编码统计",
    },
  },
  social: {
    githubUsername,
    footerLinks: [
      {
        label: "GitHub",
        icon: "◈",
        href: `https://github.com/${githubUsername}`,
      },
      {
        label: "自用 VPN",
        icon: "✈",
        href: "https://go.invitevp.com/#/register?code=kJRst0sa",
      },
    ],
  },
  pages: {
    notFoundImage: "/img/404.svg",
    notFoundMessage: "页面不存在，旧站的页面链接已经改变，请到",
    notFoundLinkLabel: "主页",
    notFoundMessageSuffix: "中寻找。",
  },
  article: {
    licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
} as const
