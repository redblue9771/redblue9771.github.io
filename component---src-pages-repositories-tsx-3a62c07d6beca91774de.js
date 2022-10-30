"use strict";(self.webpackChunkredblue_fun=self.webpackChunkredblue_fun||[]).push([[108],{6891:function(e,n,i){i.r(n);var s=i(3391),l=i(7480),r=i(7294),t=i(3639),a=i(5893);n.default=function(){var e=r.useContext(l.SiteMetadata).setMetadata,n=r.useState([]),i=n[0],o=n[1],d=r.useState([]),u=d[0],c=d[1];return r.useEffect((function(){e((function(){return{author:null,siteUrl:null,date:null,title:"项目",subTitle:"吾与徐工孰娴编码之技",description:"Talk is cheap. Show me the code."}}))}),[]),r.useEffect((function(){fetch("https://api.github.com/graphql",{method:"POST",body:JSON.stringify({query:"\n        {\n          viewer {\n            repositories(privacy: PUBLIC, isFork: false, first: 99, orderBy: {field: UPDATED_AT, direction: DESC}) {\n              nodes {\n                id\n                name\n                createdAt\n                pushedAt\n                updatedAt\n                url\n                forkCount\n                licenseInfo {\n                  name\n                  id\n                }\n                primaryLanguage {\n                  name\n                  id\n                  color\n                }\n                homepageUrl\n                description\n                stargazerCount\n                commitComments(last: 1) {\n                  nodes {\n                    commit {\n                      author {\n                        name\n                      }\n                      message\n                    }\n                  }\n                }\n              }\n            }\n            gists(privacy: PUBLIC, first: 99, orderBy: {field: UPDATED_AT, direction: DESC}) {\n              nodes {\n                id\n                description\n                updatedAt\n                url\n              }\n            }\n          }\n        }        \n    "}),headers:{Authorization:"bearer "+{}.GATSBY_GITHUB_TOKEN}}).then((function(e){return e.json()})).then((function(e){var n,i,s,l,r,t,a,d;o(null!==(n=null==e||null===(i=e.data)||void 0===i||null===(s=i.viewer)||void 0===s||null===(l=s.repositories)||void 0===l?void 0:l.nodes)&&void 0!==n?n:[]),c(null!==(r=null==e||null===(t=e.data)||void 0===t||null===(a=t.viewer)||void 0===a||null===(d=a.gists)||void 0===d?void 0:d.nodes)&&void 0!==r?r:[])}))}),[]),(0,a.jsxs)(t.Z,{fluid:"lg",className:"mx-auto",children:[(0,a.jsx)("h3",{children:(0,a.jsx)("a",{href:"https://github.com/redblue9771",target:"_blank",rel:"noreferrer noopener",children:"💻 Repositories"})}),(0,a.jsxs)(s.TY,{children:[0===i.length&&(0,a.jsx)(s.jq,{header:(0,a.jsx)("h5",{children:(0,a.jsx)("strong",{className:"masked",children:"🏃‍♂️ 从 github.com/redblue9771 拉取中…"})}),point:(0,a.jsx)("i",{className:"bi bi-cpu"})}),i.map((function(e){var n,i,l,t,o,d,u,c,h=e.id,m=e.name,p=e.description,f=e.updatedAt,b=e.forkCount,j=e.stargazerCount,x=e.commitComments,v=e.licenseInfo,g=e.primaryLanguage;return(0,a.jsx)(s.jq,{header:(0,a.jsxs)(r.Fragment,{children:[(0,a.jsx)("h5",{className:"d-inline-block",children:m}),(0,a.jsx)("div",{children:(0,a.jsxs)("small",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("i",{className:"bi bi-code-slash"}),g?g.name:""]}),"   ",(0,a.jsxs)("span",{children:[(0,a.jsx)("i",{className:"bi bi-star"}),j]}),"   ",(0,a.jsxs)("span",{children:[(0,a.jsx)("i",{className:"bi bi-bezier2"}),b]}),"   ",v&&(0,a.jsxs)("span",{children:[(0,a.jsx)("i",{className:"bi bi-book-half"}),v.name]})]})})]}),body:(0,a.jsxs)(r.Fragment,{children:[(0,a.jsx)("p",{children:p}),(null==x||null===(n=x.nodes)||void 0===n?void 0:n[0])&&(0,a.jsxs)("small",{className:"d-block",children:["最新的提交：",null==x||null===(i=x.nodes)||void 0===i||null===(l=i[0])||void 0===l||null===(t=l.commit)||void 0===t?void 0:t.message," by"," ",null==x||null===(o=x.nodes)||void 0===o||null===(d=o[0])||void 0===d||null===(u=d.commit)||void 0===u||null===(c=u.author)||void 0===c?void 0:c.name]})]}),footer:(0,a.jsx)("p",{children:(0,a.jsxs)("small",{children:["最近一次更新：",new Date(f).toLocaleDateString()]})}),point:(0,a.jsx)("i",{className:"bi bi-cpu"})},h)}))]}),(0,a.jsx)("h3",{children:(0,a.jsx)("a",{href:"https://gist.github.com/redblue9771",target:"_blank",rel:"noreferrer noopener",children:"🏷️ Gist"})}),(0,a.jsx)("ul",{children:u.map((function(e){var n=e.id,i=e.description,s=e.updatedAt,l=e.url;return(0,a.jsx)("li",{children:(0,a.jsxs)("a",{href:l,target:"_blank",rel:"noopener noreferrer",title:null!=i?i:"",children:[new Date(s).toLocaleDateString()," - ",i]})},n)}))})]})}}}]);
//# sourceMappingURL=component---src-pages-repositories-tsx-3a62c07d6beca91774de.js.map