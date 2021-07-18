import { MainLayout } from "@/features/layouts"
import React from "react"

const NotFoundPage = () => (
  <MainLayout>
    {/* <Seo title="404: Not found" /> */}
    <div className="container text-center my-5">
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </MainLayout>
)

export default NotFoundPage
