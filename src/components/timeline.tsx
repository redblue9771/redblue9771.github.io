import "./timeline.min.css"
function Timeline({ children, ...props }: React.PropsWithChildren) {
  return (
    <div className="timeline timeline-single-column" {...props}>
      {children}
    </div>
  )
}

export default Timeline
