import {
  Footer,
  Header,
  MainNavbar,
  useSiteMetadataContext,
} from "@/features/layouts"
import "@/global.scss"
import { useClientRect } from "@/hooks"
import { Analytics } from "@vercel/analytics/react"

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  const [rect, headerRoot] = useClientRect()
  const { metadata } = useSiteMetadataContext()

  return (
    <>
      <Analytics />
      <MainNavbar absElementTop={rect?.top ?? 0} context={metadata} />
      <Header context={metadata} />
      <main ref={headerRoot}>{children}</main>
      <Footer />
    </>
  )
}
