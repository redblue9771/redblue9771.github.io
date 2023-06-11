//@ts-nocheck

import "./geometric.css"

const container = ({ children }) => (
  <div className="main-timeline-geo">{children}</div>
)

const item = ({ date, title, description, component: Component, ...other }) =>
  Component ? (
    <Component className="timeline-geo" {...other}>
      <div className="timeline-geo-icon" />
      <div className="timeline-geo-content">
        <span className="date">{date}</span>
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
      </div>
    </Component>
  ) : (
    <div className="timeline-geo" key={date || title || description}>
      <div className="timeline-geo-icon" />
      <div className="timeline-geo-content">
        <span className="date">{date}</span>
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
      </div>
    </div>
  )

export default {
  Container: container,
  Item: item,
}
