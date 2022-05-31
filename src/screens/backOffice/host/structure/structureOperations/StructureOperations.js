import { useState, useEffect } from "react";

import moment from "moment";

import { routes } from "../../../../../routes/routes";

import { Form, Input, Button, TimePicker, Spin, Radio, Row, Col, message } from "antd";
import UploadFoto from "../../../../../components/backOffice/hookComponents/uploadFoto/UploadFoto";
import SearchAddress from "../../../../../components/backOffice/hookComponents/searchAddress/SearchAddress";

import GoBackButton from "../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

//API
import {
  disableStrutturaPutApi,
  insertStrutturaPostApi,
  strutturaDetailIdGetApi,
  updateStrutturaPutApi,
} from "../../../../../services/api/struttura/strutturaApi";
import { decryptItem } from "../../../../../utils/crypto/crypto";

import { connect } from "react-redux";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../../../../utils/localStorage/localStorage";
import { myProfilesGetApi } from "../../../../../services/api/user/userApi";

const StructureOperation = (props) => {
  const { t } = useTranslation();

  const [state, setState] = useState(null);

  const { TextArea } = Input;
  const location = useLocation();

  let structureValue = {
    address: {
      cap: "",
      citta: "",
      latitudine: 0,
      longitudine: 0,
      numero_civico: "",
      provincia: "",
      stato: "",
      via: "",
    },
    category: "",
    checkIn: "16:00",
    checkOut: "22:00",
    description: "",
    images: [],
    title: "",
    userId: null, //int
  };

  useEffect(() => {
    const getUserInfo = async () => {
      setLocalStorage(
        "token",
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwLmdub2dub0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVU0VSIiwiSE9TVCJdLCJpYXQiOjE2NTM5ODU0MzUsImV4cCI6MTY1Mzk4OTAzNX0.JJYXoCBrOFE4VrZo3AO3IgIWUoznpRfOQFrwvoV6yU8"
      );
      const HEADER = getLocalStorage("token");
      const res = await myProfilesGetApi(HEADER);
      const userInfo = res.data;
      structureValue.userId = userInfo.utente.id;
      setState(structureValue);
    };
    // Per farlo funzionare usare json-server
    const getStructure = async () => {
      const res = await strutturaDetailIdGetApi(location.state.idStructure);
      const strutturaDetail = res.data;

      structureValue.title = strutturaDetail?.nome_struttura;
      structureValue.description = strutturaDetail?.descrizione;
      structureValue.address = strutturaDetail?.indirizzo;
      structureValue.category = strutturaDetail?.tipologiaStrutturaId?.tipo;
      structureValue.checkIn = moment(strutturaDetail?.checkIn).format("HH:MM");
      structureValue.checkOut = moment(strutturaDetail?.checkOut).format(
        "HH:MM"
      );
      structureValue.userId = strutturaDetail?.host?.user?.id;
      setState(structureValue);
    };

    if (location.state.idStructure !== null) {
      getStructure();
    } else {
      getUserInfo();
    }
  }, []);

  // PER FORM ANT
  const onFinish = (values) => {
    let upState = Object.assign(state);
    if (state.address.via !== "") {
      const HEADER = getLocalStorage("token");
      upState.title = values.announce;
      upState.description = values.description;
      upState.category = values.category;
      upState.checkIn = moment(values.checkIn).format("HH:MM");
      upState.checkOut = moment(values.checkOut).format("HH:MM");

      if (location.state.idStructure === null) {
        //nuovo inserimento
        insertStrutturaPostApi(upState, HEADER);
      } else {
        console.log(
          updateStrutturaPutApi(location.state.idStructure, upState, HEADER)
        );
      }
      message.success('Operation complete');
    }else{
      message.warning('Missing information')
    }
    setState(upState);
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Somthing went wrong, chek if all form are filled')
  };

  // PER COMPONENTI DEL FORM
  const onChangeFoto = (value) => {
    setState({ ...state, images: value });
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

    let objAddressForPost = {
      cap: zipCode,
      citta: city,
      latitudine: addressObj.coo.lat,
      longitudine: addressObj.coo.lon,
      numero_civico: houseNumber,
      provincia: province,
      stato: country,
      via: address,
    };

    setState({ ...state, address: objAddressForPost });
  };

  return (
    <>
      {state === null ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            announce: state.title,
            category: state.category,
            description: state.description,
            checkIn: moment(state.checkIn, "HH:mm"),
            checkOut: moment(state.checkOut, "HH:mm"),
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
              <Form.Item name="address" label={t("common.address")}>
                {/* <Input name="address" placeholder={t("common.address")} /> */}
                <SearchAddress
                  placeholder={t("common.address")}
                  callback={getAddressObject}
                  defValue={`${state.address.via}, ${state.address.citta} (${state.address.provincia}) - CAP: ${state.address.cap}`}
                />
              </Form.Item>
            </Col>
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

const mapStateToProps = (state) => ({
  tokenDuck: state.tokenDuck,
  userDuck: state.userDuck,
});

export default connect(mapStateToProps)(StructureOperation);
