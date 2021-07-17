import React from "React"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.scss"

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="container-fluid p-0">
      {/* <Navbar siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
      <main>
        <main>{children}</main>
      </main>
    </div>
  )
}

export default Layout
