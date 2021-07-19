import React from "react"
import "./Divider.scss"

interface IFC {
  children: React.ReactNode
}
function Divider({ children }: IFC) {
  return (
    <div className="divider">
      <span />
      <span>{children}</span>
      <span />
    </div>
  )
}

export default Divider
