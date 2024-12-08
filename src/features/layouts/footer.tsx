import { useMemo } from "react"

export const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  return (
    <footer className="footer">
      <div className="footer__wrapper" id="fl">
        <div className="footer__wrapper__content text-white text-center">
          <p>版权所有 &copy; 2017 - {currentYear} 赤琦。保留所有权利。</p>
          <p>
            Copyright &copy; 2017 - {currentYear} RedBlue. All Rights Reserved.
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
              rel="noopener noreferrer"
            >
              <i className="bi bi-github" /> GitHub
            </a>
            丨
            <a
              href="https://go.invitevp.com/#/register?code=kJRst0sa"
              target="_blank"
              className="text-light"
            >
              <i className="bi bi-airplane-engines" /> 自用 VPN
            </a>
          </p>
          <p className="slogan">复兴中华 - 新中国、新时代、新青年 - 中华复兴</p>
          <p>JAMStack丨React.js丨Gatsby.js</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
