import React from "react"
import { Container } from "react-bootstrap"
import { SiteSiteMetadata } from "typings/graphql-types"

interface IMainNavBarProps {
  context: ISiteSiteMetadata
}

const Header = ({ context }: IMainNavBarProps) => {
  return (
    <header id="head" className="header" data-sal="fade">
      {/* {renderTitle()} */}
      <div className="header__wrapper">
        <Container className="header__wrapper__content" fluid="lg">
          <h1>{context.subTitle}</h1>
          <h2>{context.description}</h2>
          <h3> {context.date}</h3>
        </Container>
      </div>
    </header>
  )
}

export default Header
