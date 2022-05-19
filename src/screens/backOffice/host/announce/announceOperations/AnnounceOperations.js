import {
  InputNumber,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Form,
  Spin,
  Space,
} from "antd";
import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

//STYLE
import "./AnnounceOperations.less";

const AnnounceOperation = () => {
  const [state, setState] = useState({ data: null });

  const location = useLocation()

  const initialFormValue = {
    announce: "",
    rules: "",
    service: "",
    description: "",
    priceForNight: "",
    beds: "",
    rooms: "",
  };

  useEffect(() => {
    // const getAnnounce = async () => {
    //   const res = await fetch(`http://localhost:30001/announces/0`);
    //   const announceFromServer = await res.json();
    //   setState({ ...state, data: announceFromServer });
    // };

    // if (location.state.idStructure !== null) {
    //   // futura chiamata a API
    //   getAnnounce();
    // } else {
      setState({ ...state, data: initialFormValue });
    // }
  }, []);

  const { TextArea } = Input;

  const onFinish = (values) => {
    setState({ ...state, values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {state.data === null ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            announce: state.data.announce,
            rules: state.data.rules,
            service: state.data.service,
            description: state.data.description,
            priceForNight: state.data.priceForNight,
            beds: state.data.beds,
            rooms: state.data.rooms,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* INPUT NUMBER PRICE AND BEDS */}
          <div className="input_number_container ">
            <Form.Item
              label="Price for night"
              name="priceForNight"
              rules={[
                {
                  required: true,
                  message: "Insert price",
                },
              ]}
            >
              <InputNumber
                prefix="$"
                className="input_number_item border_radius_all_input"
                min={1}
                max={9999}
                // value={state.data !== null ? state.data.priceOfNight : ""}
              />
            </Form.Item>

            <Form.Item
              label="Beds"
              name="beds"
              rules={[
                {
                  required: true,
                  message: "Insert number of beds",
                },
              ]}
            >
              <InputNumber
                className="input_number_item border_radius_all_input"
                min={1}
                max={50}
              />
            </Form.Item>
          </div>

          {/* CHECKBOX AMMENITIES GROUPE */}
          <div className="checkbox_ammenities_container">
            <Form.Item
              label="Services"
              name="checkbox-group"
              rules={[
                {
                  required: true,
                  message: "!",
                },
              ]}
            >
              <Checkbox.Group className="checkbox_group_service" name="service">
                <Row>
                  <Col span={8}>
                    <Checkbox value="servizio-3">servizio-3</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-4">servizio-4</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-5">servizio-5</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-6">servizio-6</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-7">servizio-7</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-8">servizio-8</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-9">servizio-9</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>

          {/* ONLY INPUT TEXT AND TEXT AREA */}
          <div className="input_text_container">
            <Form.Item
              label="Announce"
              name="announce"
              rules={[
                {
                  required: true,
                  message: "!",
                },
              ]}
            >
              <Input
                name="announce"
                placeholder="Basic usage"
                className="input_announce border_radius_all_input"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "!",
                },
              ]}
            >
              <TextArea
                placeholder="Description"
                name="description"
                rows={6}
                className="input_text_area border_radius_all_input"
              />
            </Form.Item>
          </div>

          {/* INPUT NUMBER FOR NUMBER OF BADS AND NUMBER OF ROOMS */}
          <div className="input_number_container">
            <div className="margin_input_number">
              <Form.Item
                label="Rooms"
                name="rooms"
                rules={[
                  {
                    required: true,
                    message: "!",
                  },
                ]}
              >
                <InputNumber
                  className="input_number_item border_radius_all_input"
                  min={1}
                  max={50}
                  // defaultValue={50}
                />
              </Form.Item>
            </div>
          </div>

          {/* CHECKBOX OF RULES */}
          <div className="checkbox_rules_container">
            <Form.Item
              label="Rules"
              name="rules"
              rules={[
                {
                  required: true,
                  message: "!",
                },
              ]}
            >
              <Checkbox.Group className="checkbox_group_rules">
                <div>
                  <Checkbox value="A">Smoking allowed</Checkbox>
                </div>

                <div>
                  <Checkbox value="smoking-allowed2">Smoking allowed</Checkbox>
                </div>

                <div>
                  <Checkbox value="smoking-allowed3">Smoking allowed</Checkbox>
                </div>

                <div>
                  <Checkbox value="B">Smoking allowed</Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>
          </div>

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 25,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AnnounceOperation;
