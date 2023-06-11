import "@popperjs/core/dist/umd/popper.min.js"
import "bootstrap/dist/js/bootstrap.min.js"
import type { GatsbyBrowser } from "gatsby"
import * as React from "react"
import { AppProviders, MainLayout } from "./src/features/layouts"

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => <AppProviders>{element}</AppProviders>

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => <MainLayout>{element}</MainLayout>
