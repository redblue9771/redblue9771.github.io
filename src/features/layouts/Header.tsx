import type { ICustomSiteMetadata } from "@/templates/main.layout"
import React from "react"
import { Container } from "react-bootstrap"

interface IMainNavBarProps {
  context: ICustomSiteMetadata
}

const Header = ({ context }: IMainNavBarProps) => {
  return (
    <header id="head" className="header" data-sal="fade">
      {/* {renderTitle()} */}
      <div className="header__wrapper">
        <Container className="header__wrapper__content" fluid="lg">
          <h1 className="header__wrapper__content__title">
            {context.subTitle}
          </h1>
          <h2>{context.description}</h2>
          <h3> {context.date}</h3>
        </Container>
      </div>
    </header>
  )
}

export default Header
