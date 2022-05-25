import React, { useEffect, useState } from "react";
// module
import { Helmet } from "react-helmet";

//rrd
import { Navigate, useLocation } from "react-router-dom";

//css
import "./DetailsProp.scss";
// REACT LEAFLET
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import Map from '../../../components/frontEnd/hookComponents/map/Map'

//hooks
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

//api
import { strutturaDetailIdGetApi } from "../../../services/api/struttura/strutturaApi";

//localstorage
// import { getLocalStorage } from "../../../utils/localStorage/localStorage";

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { serviceStruttureIdGetApi } from "../../../services/api/lista/listaServizio/listaServizioApi";

//util
import { annuncioOnStrutturaGetApi } from "../../../services/api/annuncio/annuncioApi";

//components
import Service from '../../../components/frontEnd/services/Service';
import Rooms from '../../../components/frontEnd/funcComponents/rooms/Rooms';
import Modal from '../../../components/common/modal/Modal';
import ContactHost from "../../../components/frontEnd/classComponents/pageComponents/modalChildrenComponent/contactHost/ContactHost";
import DetailsPropRoom from "./DetailsPropRoom";
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";

let checkOutArray = []

const DetailsProp = () => {
  let arrayToCheckout = []
  const [state, setState] = useState({
    property: null,
    serviceList: null,
    roomsList: null,
    isContactHost: false,
    isDetailsRoom: false,
    checkOutList: [],
    checkOutPrice: 0
  })
  const { id } = useParams();
  const location = useLocation();
  useEffect(() => {
    (async () => {
      const properties = await strutturaDetailIdGetApi(id, "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdXRoQGhvc3QiLCJyb2xlcyI6WyJVU0VSIiwiSE9TVCIsIkFETUlOIl0sImlhdCI6MTY1MzQ4MDMxOCwiZXhwIjoxNjUzNDgzOTE4fQ.fDgfebDnxjvqzzyQoEHHL0LuxhUrEsLdD14Kv8ip9Ck")
      const services = await serviceStruttureIdGetApi(id)
      const rooms = await annuncioOnStrutturaGetApi(id)
      console.log(properties, services, rooms)
      setState({
        ...state,
        property: properties?.data,
        serviceList: services?.data,
        roomsList: rooms?.data
      })
      console.log(state)
      checkOutArray = Array.apply(null, Array(rooms?.data.length));
    })()
  }, [])

  const { t } = useTranslation();



  const handleClose = (params) => () => {
    setState({
      ...state,
      [params]: false
    })
  }

  const addToCheckOut = (temp_id, isSelected, obj) => {
    isSelected ? checkOutArray[temp_id] = undefined : checkOutArray[temp_id] = {
      ...obj,
      price: obj.price * obj.count
    };
    let totalPrice = 0
    for (let index = 0; index < checkOutArray.length; index++) {
      if (checkOutArray[index] !== undefined) totalPrice += checkOutArray[index].price
    }
    setState({
      ...state,
      checkOutPrice: totalPrice
    })

    arrayToCheckout = checkOutArray.filter((element) => {
      return element !== undefined;
    })
    console.log(arrayToCheckout)
  }

  const goToCheckout = () => {
    Navigate("checkout", { state: arrayToCheckout })
  }

  const generateRooms = (item, key) => {

    return <Rooms
      key={key}
      numberOfPeople={4} //da modificare
      title={item?.titolo}
      price={item?.prezzo}
      count={item?.count}
      temp_id={key}
      callback={addToCheckOut}
    />
  }



  return (
    <>
      {console.log(state)}
      <Helmet>
        <title>{t("fe.screens.propertyDetails.details")}</title>
      </Helmet>
      {/*  <button
        onClick={() => setState({ ...state, isDetailsRoom: true })}
      >
        bau
      </button> */}
      <Modal
        callback={handleClose('isContactHost')}
        isOpen={state.isContactHost}
        classNameCustom={'modal contact-host-modal'}
      >
        <ContactHost />
      </Modal>

      <Modal
        callback={handleClose("isDetailsRoom")}
        isOpen={state.isDetailsRoom}
        classNameCustom={'modal contact-host-modal'}
      >
        <DetailsPropRoom />
      </Modal>

      {state.property === null || '' ? <p>{t("fe.screen.propertyDetails.noProperty")}</p> : <div className="property_container">
        <img className="structure_img_property" src="https://p.bookcdn.com/data/Photos/380x250/8758/875870/875870843/Beb-Ampelea-photos-Exterior-Beb-Ampelea.JPEG" alt="img_struttura" />
        <div className="padding_page">
          <h2>{state.property?.nome_struttura}</h2>
          <div className="property_core_info_container">
            <div className="location_review">
              <span>{`${state.property?.indirizzo.citta}, Via ${state.property?.indirizzo.via}`}</span>
              <p><FontAwesomeIcon icon={faStar} />{state.property?.media_recensioni}<span>{`(${state.property?.numero_recensioni})`}</span></p>
            </div>
            <div className="checkout_in_date">
              <span>{`CheckIn: ${state.property?.checkin} - CheckOut: ${state.property?.checkout}`}</span>
            </div>
          </div>
          <div className="description_container">
            <h3>{t("common.description")}</h3>
            <p>{state.property?.descrizione}</p>
          </div>
          {/* regole da aggiungere appena pronte */}
          <div className="room_container">
            {state.roomsList?.map(generateRooms)}
          </div>
          <div className="total_price_container">
            <p>Total {state.checkOutPrice}&euro;</p>
            <UiButton
              callback={goToCheckout}
              label={"Book Now!"} />
          </div>
          <div className="map_container">
            {/* <Map ></Map> */}
          </div>
          <div className="review_container"></div>
        </div>
      </div>}
    </>
  );
};
export default DetailsProp