interface ITimelineItemProps {
  body?: React.ReactNode
  header?: React.ReactNode
  headerProps?: any
  bodyProps?: any
  point?: React.ReactNode
  pointProps?: any
  footer?: React.ReactNode
  footerProps?: any
}

function TimelineItem({
  headerProps,
  header,
  body,
  bodyProps,
  point,
  pointProps,
  footer,
  footerProps,
  ...props
}: ITimelineItemProps) {
  return (
    <div className="timeline-item" {...props}>
      <div className="timeline-point timeline-point-info" {...pointProps}>
        {point}
      </div>
      <div className="timeline-event timeline-event-info">
        <div className="timeline-heading" {...headerProps}>
          {header}
        </div>
        <div className="timeline-body" {...bodyProps}>
          {body}
        </div>

        <div className="timeline-footer" {...footerProps}>
          {footer}
        </div>
      </div>
    </div>
  )
}

export default TimelineItem
