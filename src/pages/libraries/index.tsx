import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import MainLayout from "@/components/layouts/Main.layout"
import libraries from "@/data/libraries.json"

function Libraries() {
  return (
    <MainLayout>
      <Container fluid="lg">
        {Object.keys(libraries).map(libTitle => (
          <React.Fragment key={libTitle}>
            <h3 className="mb-3 text-new">{libTitle}</h3>
            <ul>
              {Object.values(libraries[libTitle]).map(
                ({ name, author, path, description, keywords }: any) => (
                  <li id={name} className="mb-3 " key={name}>
                    <Row>
                      <Col sm={12} md={8} lg={9}>
                        <div>
                          {name} - {author}
                        </div>
                        {description && (
                          <div className="text-muted">简述：{description}</div>
                        )}

                        <div className="text-muted tags mb-3">
                          关键词：{keywords.join("、")}
                        </div>
                      </Col>
                      <Col sm={12} md={4} lg={3}>
                        <Button
                          href={`/libraries/${path}`}
                          target="_blank"
                          variant="outline-primary"
                        >
                          📥 Download / Read
                        </Button>
                      </Col>
                    </Row>
                  </li>
                )
              )}
            </ul>
          </React.Fragment>
        ))}
      </Container>
    </MainLayout>
  )
}

export default Libraries
