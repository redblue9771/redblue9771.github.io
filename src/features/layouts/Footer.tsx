import React from "react"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper" id="fl">
        <div className="footer__wrapper__content text-white text-center">
          <p>版权所有 &copy; 2017 - {new Date().getFullYear()} 赤琦</p>
          <p>
            Copyright &copy; 2017 - {new Date().getFullYear()} RedBlue. All
            Rights Reserved.丨(CC BY-SA 4.0)
          </p>
          <p>
            <a href="/index.xml" target="_blank" className="text-light">
              <i className="bi bi-rss" /> RSS
            </a>
            丨
            <a
              href="https://github.com/redblue9771"
              target="_blank"
              className="text-light"
            >
              <i className="bi bi-github" /> GitHub
            </a>
            丨
            <a
              href="mailto:redblue9771@icloud.com"
              target="_blank"
              className="text-light"
            >
              <i className="bi bi-at" /> E-mail
            </a>
          </p>
          <p>复兴中华 - 新中国、新时代、新青年 - 中华复兴</p>
          <p>JAMStack丨React.js丨Gatsby.js</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
