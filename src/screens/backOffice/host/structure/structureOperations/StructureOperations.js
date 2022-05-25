import { useState, useEffect } from "react";

import moment from "moment";

import { routes } from "../../../../../routes/routes";

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
import SearchAddress from "../../../../../components/backOffice/hookComponents/searchAddress/SearchAddress";

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

  // PER FORM ANT
  const onFinish = (values) => {
    setState({ ...state, values });
    // CONTROLLARE, IMMAGINI NON GESTITE
    /* {
               structurePut(state.values.data ) 
                 */
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // PER COMPONENTI DEL FORM
  const onChangeFoto = (value) => {
    setState({
      data: {
        ...state.data,
        fotoStructure: value,
      },
    });
  };

  const getAddressObject = (addressObj) => {
    let splittedAddress = addressObj.value.split(", ");
    const [city, province, region, zipCode, country] =
      splittedAddress.slice(-5);
    let address = splittedAddress.slice(0, -4);

    let houseNumber = splittedAddress[0];

    let firstPartHouseNumber = houseNumber.slice(0, -1);
    let secondPartHouseNumber = houseNumber.slice(-1);

    if (!isNaN(parseInt(secondPartHouseNumber))) {
      houseNumber = `${firstPartHouseNumber}${secondPartHouseNumber}`;
      address.shift();
    } else {
      if (!isNaN(parseInt(firstPartHouseNumber))) {
        houseNumber = `${firstPartHouseNumber}${secondPartHouseNumber}`;
        address.shift();
      } else {
        houseNumber = 0;
      }
    }

    address = address.join(", ");

    setState({
      ...state,
      houseNumber: houseNumber,
      address: address,
      latitudine: addressObj.coo.lat,
      longitudine: addressObj.coo.lon,
      city: city,
      province: province,
      region: region,
      zipCode: zipCode,
      country: country,
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
            <GoBackButton
              route={`/${routes.DASHBOARD}/${routes.STRUCTURE_LIST}`}
            />
            <h1>{`${
              location.state.idStructure === null ? "Inserisci" : "Modifica"
            } Annuncio`}</h1>
          </div>

          <Form.Item
            label={t("common.photos")}
            name="photos"
            // rules={[
            //   {
            //     required: true,
            //     message: t("toasts.operationPhotos"),
            //   },
            // ]}
          >
            <UploadFoto addFotoStructure={onChangeFoto} />
          </Form.Item>

          <Row>
            <Form.Item
              label={t("common.announceTitle")}
              name="announce"
              rules={[
                {
                  required: true,
                  message: t("toasts.operationAnnounce"),
                },
              ]}
            >
              <Input name="announce" placeholder={t("common.announceTitle")} />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("common.category")}
              name="category"
              rules={[
                {
                  required: true,
                  message: t("toasts.operationCategory"),
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
              label={t("common.description")}
              name="description"
              rules={[
                {
                  required: true,
                  message: t("toasts.operationDescription"),
                },
              ]}
            >
              <TextArea
                name="description"
                placeholder={t("common.description")}
              />
            </Form.Item>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row">
              <Form.Item
                label={t("common.address")}
                // name="address"
                // rules={[
                //   {
                //     required: true,
                //     message: t("toasts.operationAddress"),
                //   },
                // ]}
              >
                {/* <Input name="address" placeholder={t("common.address")} /> */}
                <SearchAddress
                  placeholder={t("common.address")}
                  callback={getAddressObject}
                />
              </Form.Item>
            </Col>

            {/* <Col className="gutter-row">
              <Form.Item
                label={t("common.city")}
                name="city"
                rules={[
                  {
                    required: true,
                    message: t("toasts.operationCity"),
                  },
                ]}
              >
                <Input name="city" placeholder={t("common.city")} />
              </Form.Item>
            </Col> */}
          </Row>

          <Row gutter={16}>
            {/* <Col className="gutter-row">
              <Form.Item
                label={t("common.country")}
                name="country"
                rules={[
                  {
                    required: true,
                    message: t("toasts.operationCountry"),
                  },
                ]}
              >
                <Input name="country" placeholder={t("common.country")} />
              </Form.Item>
            </Col>

            <Col className="gutter-row">
              <Form.Item
                label={t("common.zipCode")}
                name="zipCode"
                rules={[
                  {
                    required: true,
                    message: t("toasts.operationZipCode"),
                  },
                ]}
              >
                <InputNumber name="zipCode" placeholder={t("common.zipCode")} />
              </Form.Item>
            </Col> */}
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row">
              <Form.Item
                label={t("common.checkIn")}
                name="checkIn"
                rules={[
                  {
                    required: true,
                    message: t("toasts.operationCheckIn"),
                  },
                ]}
              >
                <TimePicker name="checkIn" placeholder={t("common.checkIn")} />
              </Form.Item>
            </Col>
            <Col className="gutter-row">
              <Form.Item
                label={t("common.checkOut")}
                name="checkOut"
                rules={[
                  {
                    required: true,
                    message: t("toasts.operationCheckOut"),
                  },
                ]}
              >
                <TimePicker
                  name="checkOut"
                  placeholder={t("common.checkOut")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            {t("common.submit")}
          </Button>
        </Form>
      )}
    </>
  );
};

export default StructureOperation;
