import {
  InputNumber,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Form,
  Spin,
} from "antd";

import UploadFoto from "../../../../../components/backOffice/hookComponents/uploadFoto/UploadFoto";

import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

//STYLE
import "./AnnounceOperations.less";
import { useTranslation } from "react-i18next";

const AnnounceOperation = () => {
  const [state, setState] = useState({ data: null });
  const { t } = useTranslation();

  const location = useLocation();

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

  const onChangeFoto = (value) => {
    setState({
      data: {
        ...state.data,
        fotoStructure: value,
      },
    });
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
          <Form.Item
            label={t("bo.screens.host.AnnounceOperation.photos")}
            name="photos"
            rules={[
              {
                required: true,
                message: t(
                  "bo.screens.host.AnnounceOperation.errorMessage.photos"
                ),
              },
            ]}
          >
            <UploadFoto addFotoStructure={onChangeFoto} />
          </Form.Item>

          <Row gutter={32}>
            <Col>
              <Form.Item
                label={t("bo.screens.host.AnnounceOperation.priceForNight")}
                name="priceForNight"
                rules={[
                  {
                    required: true,
                    message: "bo.screens.host.AnnounceOperation.errorMessage.pricePerNight",
                  },
                ]}
              >
                <InputNumber
                  prefix="$"
                  min={1}
                  max={9999}
                />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                label={t("bo.screens.host.AnnounceOperation.beds")}
                name="beds"
                rules={[
                  {
                    required: true,
                    message: "bo.screens.host.AnnounceOperation.errorMessage.beds",
                  },
                ]}
              >
                <InputNumber min={1} max={50} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Form.Item
              label={t("bo.screens.host.AnnounceOperation.services")}
              name="services"
              rules={[
                {
                  required: true,
                  message: "bo.screens.host.AnnounceOperation.errorMessage.services",
                },
              ]}
            >
              <Checkbox.Group name="service">
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
          </Row>

          <Row>
            <Form.Item
              label={t("bo.screens.host.AnnounceOperation.announce")}
              name="announce"
              rules={[
                {
                  required: true,
                  message: "bo.screens.host.AnnounceOperation.errorMessage.announce",
                },
              ]}
            >
              <Input name="announce" placeholder="Basic usage" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "bo.screens.host.AnnounceOperation.errorMessage.description",
                },
              ]}
            >
              <TextArea placeholder="Description" name="description" rows={6} />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("bo.screens.host.AnnounceOperation.rooms")}
              name="rooms"
              rules={[
                {
                  required: true,
                  message: "bo.screens.host.AnnounceOperation.errorMessage.rooms",
                },
              ]}
            >
              <InputNumber
                min={1}
                max={50}
                // defaultValue={50}
              />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("bo.screens.host.AnnounceOperation.rules")}
              name="rules"
              rules={[
                {
                  required: true,
                  message: t("bo.screens.host.AnnounceOperation.errorMessage.rules"),
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
          </Row>
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
