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

//import { useLocation } from "react-router-dom";

//STYLE
import "./AnnounceOperations.scss";
import { useTranslation } from "react-i18next";
import { annuncioDetailGetApi } from "../../../../../services/api/annuncio/annuncioApi";
import { useLocation } from "react-router-dom";

const AnnounceOperation = () => {
  const [state, setState] = useState(null);

  const { t } = useTranslation();

  const location = useLocation();

  const announceValue = {
    id: null,
    titolo: "",
    descrizione: "",
    numPostiLetto: null,
    prezzo: null,
    count: 1,
    images: [],
    servizi: []
  };

  useEffect(() => {
    const getAnnounce = async () => {
      const res = await annuncioDetailGetApi(location.state.idAnnounce);
      const announce = res.data;


      announceValue.id = announce?.annuncio?.id;
      announceValue.descrizione = announce?.annuncio?.descrizione;
      announceValue.numPostiLetto = announce?.annuncio?.numPostiLetto;
      announceValue.prezzo = announce?.annuncio?.prezzo;
      announceValue.count = announce?.annuncio?.count
      announceValue.titolo = announce?.annuncio?.titolo
      announceValue.images = announce.immagini
      announceValue.servizi = announce.servizi

      setState(announceValue)
    };
    if (location.state.idStructure !== null) {
      //   // futura chiamata a API
      getAnnounce();
    } else {
      setState(null);
    }
  }, []);

  const { TextArea } = Input;

  const onFinish = (values) => {
    setState({ ...state, values });
    /* {
                   announcePut( state.values.data )
                    */
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
      {state === null ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            announce: state.titolo,
            // rules: state.rules,
            // service: state.service,
            description: state.descrizione,
            priceForNight: state.prezzo,
            beds: state.numPostiLetto,
            rooms: state.count,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* <Form.Item
            label={t("common.photos")}
            name="photos"
            rules={[
              {
                required: true,
                message: t("toasts.operationPhotos"),
              },
            ]}
          >
            <UploadFoto addFotoStructure={onChangeFoto} lista_immagini={state.images}/>
          </Form.Item> */}

          <Row gutter={32}>
            <Col>
              <Form.Item
                label={t("bo.screens.host.announceOperation.priceForNight")}
                name="priceForNight"
                rules={[
                  {
                    required: true,
                    message: "toasts.operationPricePerNight",
                  },
                ]}
              >
                <InputNumber prefix="$" min={1} max={9999} />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                label={t("bo.screens.host.announceOperation.beds")}
                name="beds"
                rules={[
                  {
                    required: true,
                    message: "toasts.operationBeds",
                  },
                ]}
              >
                <InputNumber min={1} max={50} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Form.Item
              label={t("common.services")}
              name="services"
              rules={[
                {
                  required: true,
                  message: "toasts.operationServices",
                },
              ]}
            >
              <Checkbox.Group name="service">
                <Row>
                  <Col span={8}>
                    <Checkbox value="servizio-3">
                      {t("fe.components.service.wifi")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-4">
                      {t("fe.components.service.kitchen")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-5">
                      {t("fe.components.service.airConditioning")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-6">
                      {t("fe.components.service.parking")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-7">
                      {t("fe.components.service.washingMachine")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-8">
                      {t("fe.components.service.iron")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-9">
                      {t("fe.components.service.workingPlace")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-10">
                      {t("fe.components.service.swimmingPool")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-11">
                      {t("fe.components.service.allowedSmoking")}
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="servizio-12">
                      {t("fe.components.service.alarm")}
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("common.announceTitle")}
              name="announce"
              rules={[
                {
                  required: true,
                  message: "toasts.operationAnnounce",
                },
              ]}
            >
              <Input name="announce" placeholder={t("common.announceTitle")} />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label={t("common.description")}
              name="description"
              rules={[
                {
                  required: true,
                  message: "toasts.operationDescription",
                },
              ]}
            >
              <TextArea
                placeholder={t("common.description")}
                name="description"
                rows={6}
              />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("bo.screens.host.announceOperation.rooms")}
              name="rooms"
              rules={[
                {
                  required: true,
                  message: "toasts.operationRooms",
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
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 25,
            }}
          >
            <Button type="primary" htmlType="submit">
              {t("common.submit")}
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AnnounceOperation;
