import { Card, Col, Row, Button } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faBuilding,
  faBook,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../routes/routes";

const Dashboard = () => {
  const navigate = useNavigate();


  const goTo = (path, obj = null) => () => {
    return navigate(`/${routes.DASHBOARD}/${path}`)
  }

  return (
    <Row gutter={[48, 16]} justify="space-evenly" align="middle">
      <Col span={12}>
        <Card
          title={
            <span>
              <FontAwesomeIcon icon={faBuilding} /> Structure
            </span>
          }
          bordered={true}
          onClick={goTo(routes.STRUCTURE_LIST)}
          style={{
            cursor: "pointer",
          }}
        >
          <p>Manage your structure</p>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title={
            <span>
              <FontAwesomeIcon icon={faBook} /> Booking
            </span>
          }
          bordered={false}
          onClick={goTo(routes.RESERVATION_LIST)}
          style={{
            cursor: "pointer",
          }}
        >
          <p>Manage your booking</p>
        </Card>
      </Col>

      <Col span={12}>
        <Card
          title={
            <span>
              <FontAwesomeIcon icon={faMessage} /> Messages
            </span>
          }
          bordered={true}
          onClick={goTo(routes.MESSAGE_LIST)}
          style={{
            cursor: "pointer",
          }}
        >
          <p>Manage message</p>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title={
            <span>
              <FontAwesomeIcon icon={faWallet} /> Payments
            </span>
          }
          bordered={false}
          style={{
            cursor: "pointer",
          }}
        >
          <p>Manage payments</p>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
