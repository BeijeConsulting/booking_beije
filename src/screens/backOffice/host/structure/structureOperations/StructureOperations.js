import { useState, useEffect } from "react";

import moment from "moment";

import {
  Form,
  Input,
  InputNumber,
  Button,
  TimePicker,
  Spin,
  Radio,
  Row,
  Col,
} from "antd";
import UploadFoto from "../../../../../components/backOffice/hookComponents/uploadFoto/UploadFoto";

import GoBackButton from "../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StructureOperation = () => {
  const { t } = useTranslation();

  const { TextArea } = Input;
  const [state, setState] = useState({ data: null });
  const location = useLocation();
  const initialFormValue = {
    address: "",
    announce: "",
    city: "",
    category: null,
    country: "",
    description: "",
    zipCode: null,
    checkIn: "16:00",
    checkOut: "19:00",
  };

  useEffect(() => {
    // Per farlo funzionare usare json-server
    // const getStructure = async () => {
    //   const res = await fetch(
    //     `http://localhost:3001/data/${location.state.idStructure}`
    //   );
    //   const structureFromServer = await res.json();
    //   setState({ ...state, data: structureFromServer });
    // };

    // if (location.state.idStructure !== null) {
    // futura chiamata a API
    // getStructure();
    // } else {
    setState({ ...state, data: initialFormValue });
    // }
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    setState({ ...state, values });
    // CONTROLLARE, IMMAGINI NON GESTITE
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
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            address: state.data.address,
            announce: state.data.announce,
            city: state.data.city,
            category: state.data.category,
            country: state.data.country,
            description: state.data.description,
            zipCode: state.data.zipCode,
            checkIn: moment(state.data.checkIn, "HH:mm"),
            checkOut: moment(state.data.checkOut, "HH:mm"),
          }}
        >
          <div>
            <GoBackButton />
            <h1>{`${
              location.state.idStructure === null ? "Inserisci" : "Modifica"
            } Annuncio`}</h1>
          </div>

          <Form.Item
            label={t("bo.screens.host.StructureOperation.photos")}
            name="photos"
            rules={[
              {
                required: true,
                message: t(
                  "bo.screens.host.StructureOperation.errorMessage.photos"
                ),
              },
            ]}
          >
            <UploadFoto addFotoStructure={onChangeFoto} />
          </Form.Item>

          <Row>
            <Form.Item
              label={t("bo.screens.host.StructureOperation.announce")}
              name="announce"
              rules={[
                {
                  required: true,
                  message: t(
                    "bo.screens.host.StructureOperation.errorMessage.announce"
                  ),
                },
              ]}
            >
              <Input name="announce" placeholder="Announce title" />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("bo.screens.host.StructureOperation.category")}
              name="category"
              rules={[
                {
                  required: true,
                  message: t(
                    "bo.screens.host.StructureOperation.errorMessage.category"
                  ),
                },
              ]}
            >
              <Radio.Group>
                <Radio value={"Hotel"}>Hotel</Radio>
                <Radio value={"Apartment"}>Apartment</Radio>
                <Radio value={"Villa"}>Villa</Radio>
                <Radio value={"Hostel"}>Hostel</Radio>
              </Radio.Group>
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("bo.screens.host.StructureOperation.description")}
              name="description"
              rules={[
                {
                  required: true,
                  message: t(
                    "bo.screens.host.StructureOperation.errorMessage.description"
                  ),
                },
              ]}
            >
              <TextArea name="description" placeholder="Descriprion" />
            </Form.Item>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row">
              <Form.Item
                label={t("bo.screens.host.StructureOperation.address")}
                name="address"
                rules={[
                  {
                    required: true,
                    message: t(
                      "bo.screens.host.StructureOperation.errorMessage.address"
                    ),
                  },
                ]}
              >
                <Input name="address" placeholder="address" />
              </Form.Item>
            </Col>

            <Col className="gutter-row">
              <Form.Item
                label={t("bo.screens.host.StructureOperation.city")}
                name="city"
                rules={[
                  {
                    required: true,
                    message: t(
                      "bo.screens.host.StructureOperation.errorMessage.city"
                    ),
                  },
                ]}
              >
                <Input name="city" placeholder="city" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row">
              <Form.Item
                label={t("bo.screens.host.StructureOperation.country")}
                name="country"
                rules={[
                  {
                    required: true,
                    message: t(
                      "bo.screens.host.StructureOperation.errorMessage.country"
                    ),
                  },
                ]}
              >
                <Input name="country" placeholder="country" />
              </Form.Item>
            </Col>

            <Col className="gutter-row">
              <Form.Item
                label={t("bo.screens.host.StructureOperation.zipCode")}
                name="zipCode"
                rules={[
                  {
                    required: true,
                    message: t(
                      "bo.screens.host.StructureOperation.errorMessage.zipCode"
                    ),
                  },
                ]}
              >
                <InputNumber name="zipCode" placeholder="zipCode" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row">
              <Form.Item
                label={t("bo.screens.host.StructureOperation.checkIn")}
                name="checkIn"
                rules={[
                  {
                    required: true,
                    message: t(
                      "bo.screens.host.StructureOperation.errorMessage.checkIn"
                    ),
                  },
                ]}
              >
                <TimePicker name="checkIn" placeholder="checkIn" />
              </Form.Item>
            </Col>
            <Col className="gutter-row">
              <Form.Item
                label={t("bo.screens.host.StructureOperation.checkOut")}
                name="checkOut"
                rules={[
                  {
                    required: true,
                    message: t(
                      "bo.screens.host.StructureOperation.errorMessage.checkOut"
                    ),
                  },
                ]}
              >
                <TimePicker name="checkOut" placeholder="checkOut" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default StructureOperation;
