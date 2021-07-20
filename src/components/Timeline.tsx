import React from "react"
import "./timeline.min.css"
function Timeline({ children, ...props }: any) {
  return (
    <div className="timeline timeline-single-column" {...props}>
      {children}
    </div>
  )
}

export default Timeline
