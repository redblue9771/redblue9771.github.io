import { Footer, Header, MainNavbar } from "@/features/layouts"
import "@/global.scss"
import { useClientRect } from "@/hooks"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  const [rect, headerRoot] = useClientRect()

  return (
    <>
      <Analytics />
      <MainNavbar absElementTop={rect?.top ?? 0} />
      <Header />
      <main ref={headerRoot}>{children}</main>
      <Footer />
      <SpeedInsights />
    </>
  )
}
