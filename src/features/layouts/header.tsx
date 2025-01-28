import { useHeaderMetadataContext } from "@/features/layouts"
import { useMatch } from "@reach/router"
import clsx from "clsx"
import { Container } from "react-bootstrap"

export const Header = () => {
  const articlePage = useMatch("/articles/:articleName")
  const { headerMetadata } = useHeaderMetadataContext()

  return (
    <header id="head" className="header" data-sal="fade">
      <div className="header__wrapper">
        <Container className="header__wrapper__content" fluid="lg">
          <h1
            className={clsx([
              "header__wrapper__content__title",
              !articlePage && "header__wrapper__content__title--art",
            ])}
          >
            {headerMetadata.title}
          </h1>
          {headerMetadata.subTitle && (
            <h2 className="header__wrapper__content__sub-title">
              {headerMetadata.subTitle}
            </h2>
          )}
          {headerMetadata.description && (
            <h3 className="header__wrapper__content__sub-title">
              {headerMetadata.description}
            </h3>
          )}
        </Container>
      </div>
    </header>
  )
}
