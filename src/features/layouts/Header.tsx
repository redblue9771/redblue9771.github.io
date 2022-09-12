import type { ICustomSiteMetadata } from "@/templates/main.layout"
import { useMatch } from "@reach/router"
import clsx from "clsx"
import React from "react"
import { Container } from "react-bootstrap"

interface IMainNavBarProps {
  context: ICustomSiteMetadata
}

const Header = ({ context }: IMainNavBarProps) => {
  const articlePage = useMatch("/articles/:articleName")

  return (
    <header id="head" className="header" data-sal="fade">
      {/* {renderTitle()} */}
      <div className="header__wrapper">
        <Container className="header__wrapper__content" fluid="lg">
          <h1
            className={clsx([
              "header__wrapper__content__title",
              !articlePage && "header__wrapper__content__title--art",
            ])}
          >
            {context.subTitle}
          </h1>
          {context.description && (
            <h2 className="header__wrapper__content__sub-title">
              {context.description}
            </h2>
          )}
          {context.date && (
            <h3 className="header__wrapper__content__sub-title">
              {context.date}
            </h3>
          )}
        </Container>
      </div>
    </header>
  )
}

export default Header
