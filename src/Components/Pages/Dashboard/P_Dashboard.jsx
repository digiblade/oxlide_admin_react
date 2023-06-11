import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./CSS/Dashboard.css";
import O_Tables_Data_Mapping from "../../Organisms/Table Data Mapping/O_Tables_Data_Mapping";
export default function P_Dashboard() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} lg={3} md={6} className="column-grid-initial">
            <Card className="kpi-box bg-color-1st color-light ">
              <Card.Body>
                <Card.Title className="kpi-title">KPI 1</Card.Title>
                <Card.Text className="kpi-value">Value: 100</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={3} md={6} className="column-grid-initial">
            <Card className="kpi-box bg-color-2nd color-light ">
              <Card.Body>
                <Card.Title className="kpi-title">KPI 2</Card.Title>
                <Card.Text className="kpi-value">Value: 100</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={3} md={6} className="column-grid-initial">
            <Card className="kpi-box bg-color-3rd color-light">
              <Card.Body>
                <Card.Title className="kpi-title">KPI 3</Card.Title>
                <Card.Text className="kpi-value">Value: 100</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={3} md={6} className="column-grid-initial">
            <Card className="kpi-box bg-color-4th color-light">
              <Card.Body>
                <Card.Title className="kpi-title">KPI 4</Card.Title>
                <Card.Text className="kpi-value">Value: 100</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={4} md={6}>
            <O_Tables_Data_Mapping sourceLabel={"client-details"} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
