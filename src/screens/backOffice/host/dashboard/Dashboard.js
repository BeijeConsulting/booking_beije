import { Card, Col, Row } from "antd";

const App = () => (
  <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Structure" bordered={false}>
          Manage your structure
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Bookings" bordered={false}>
          Manage your bookings
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span={8}>
        <Card title="Massages" bordered={false}>
          Answer all the question
        </Card>
        <Card title="Payments" bordered={false}>
          Manage the wallet
        </Card>
      </Col>
    </Row>
  </div>
);

export default App;
